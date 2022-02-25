import React, {
    Fragment,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import VerticalRuler from '../vertical-ruler';
import HorizontalRuler from '../horizontal-ruler';
import WidgetItem from '../canvas/layout-item';
import {
    calcBoundRange,
    calcOffset,
    completedPadding,
    getCurrentHeight,
    getMaxLayoutBound,
    TOP_RULER_LEFT_MARGIN,
    WRAPPER_PADDING,
    compact,
    formatLayoutItem,
    dynamicProgramming,
    getDropItem,
    moveElement,
    snapToGrid,
    getCurrentMouseOverWidget
} from './calc';
import styles from './styles.module.css';
import {
    DragLayoutProps,
    EditLayoutProps,
    ItemPos,
    LayoutItem,
    LayoutType,
    OperatorType,
    ReactDragLayoutProps,
    RulerPointer
} from '@/interfaces';
import GuideLine from '../guide-line';
import { copyObject, noop } from '@/utils/utils';
import { clamp, DEFAULT_BOUND } from '../canvas/draggable';
import { LayoutContext } from './context';

const ReactDragLayout = (props: ReactDragLayoutProps) => {
    const { checked_index, setCurrentChecked } = useContext(LayoutContext);

    const container_ref = useRef<HTMLDivElement>(null);
    const canvas_viewport = useRef<HTMLDivElement>(null); // 画布视窗，可视区域
    const canvas_wrapper = useRef<HTMLDivElement>(null); // canvas存放的画布，增加边距支持滚动
    const canvas_ref = useRef<HTMLDivElement>(null);
    const shadow_widget_ref = useRef<HTMLDivElement>(null);

    const [wrapper_width, setCanvasWrapperWidth] = useState<number>(0); // 画板宽度
    const [wrapper_height, setCanvasWrapperHeight] = useState<number>(0); // 画板高度

    const [ruler_hover_pos, setRulerHoverPos] = useState<RulerPointer>(); //尺子hover坐标

    const [t_offset, setTopOffset] = useState<number>(0); //垂直偏移量
    const [l_offset, setLeftOffset] = useState<number>(0); //水平偏移量

    const [is_window_resize, setWindowResize] = useState<number>(Math.random());

    const [shadow_widget, setShadowWidget] = useState<ItemPos>();
    const [old_shadow_widget, setOldShadowWidget] = useState<ItemPos>();

    const [layout, setLayout] = useState<LayoutItem[]>(); // 真实定位位置

    const [current_height, setCurrentHeight] = useState<number>(0); //高度;

    const [operator_type, setOperatorType] = useState<OperatorType>(
        OperatorType.init
    );
    const [canvas_inner_count, setCanvasInnerCount] = useState<number>(0);

    function getCurrentWidth() {
        const { need_ruler, layout_type } = props;
        const offset_width = need_ruler ? TOP_RULER_LEFT_MARGIN : 0;

        const current_width =
            layout_type === LayoutType.DRAG
                ? (props as DragLayoutProps).width
                : container_ref.current?.clientWidth
                ? container_ref.current?.clientWidth - offset_width
                : 0;

        return current_width;
    }
    /**
     * 画布宽度计算
     */
    const current_width = useMemo(
        () => getCurrentWidth(),
        [
            container_ref.current,
            props.need_ruler,
            props.layout_type,
            is_window_resize
        ]
    );

    /** 补全边距 */
    const padding = useMemo(
        () => completedPadding(props.container_padding),
        [props.container_padding]
    );

    function getCurrentGrid() {
        const { item_margin, cols, row_height } = props;

        const width =
            current_width -
            (padding.right > item_margin[1]
                ? padding.right - item_margin[1] + padding.left
                : item_margin[1]);

        return {
            col_width: width / cols,
            row_height
        };
    }

    /**
     * 单元格宽高计算
     */
    const grid = useMemo(
        () => getCurrentGrid(),
        [
            props.item_margin,
            props.cols,
            props.row_height,
            current_width,
            padding
        ]
    );

    /** 计算移动范围 */
    const bound = useMemo(
        () => calcBoundRange(current_width, current_height, padding),
        [current_width, current_height, padding]
    );

    /** 根据类型配置计算边界状态 */
    const getCurrentBound = (is_float: boolean) => {
        if (is_float) {
            return props.need_drag_bound ? bound : DEFAULT_BOUND;
        } else {
            return props.need_grid_bound ? bound : DEFAULT_BOUND;
        }
    };

    /**
     * 获取组件实际宽高
     * 组件信息补全
     */
    function getCurrentWidget(item: LayoutItem) {
        item.is_float = item.is_float ?? false;
        item.is_draggable = item.is_draggable ?? false;
        item.is_resizable = item.is_resizable ?? false;
        item.is_unhoverable = item.is_unhoverable ?? false;

        if (item.is_float) {
            return item;
        } else {
            const { col_width, row_height } = grid;
            return {
                ...item,
                x: item.x * col_width,
                y: item.y * row_height,
                w: item.w * col_width,
                h: item.h * row_height
            };
        }
    }

    /**
     * 根据children信息生成layout
     */
    useEffect(() => {
        console.log('operator_type', operator_type, props.children);

        const new_layout = props.children.map((child) => {
            const item = child.props['data-drag'] as LayoutItem;
            return getCurrentWidget(item);
        });

        compact(new_layout, grid.row_height);
        setLayout(new_layout);
    }, [props.children, grid]);

    /**
     * 缩放容器触发器
     */
    const resizeObserverInstance = new ResizeObserver((dom) => {
        setWindowResize(Math.random());
    });

    /** 监听容器变化，重新计算width、height、grid */
    useEffect(() => {
        layout &&
            container_ref.current &&
            resizeObserverInstance.observe(container_ref.current);
        return () => {
            layout &&
                container_ref.current &&
                resizeObserverInstance.unobserve(container_ref.current);
        };
    }, [container_ref.current, layout, JSON.stringify(shadow_widget)]);

    /** 判断元素是否消失 */
    const intersectionObserverInstance = new IntersectionObserver(
        (entries) => {
            entries.map(() => {
                if (operator_type !== OperatorType.resize) {
                    shadow_widget_ref.current?.scrollIntoView({
                        block: 'nearest',
                        inline: 'nearest'
                    });
                }
            });
        },
        { root: canvas_viewport.current, threshold: 0 }
    );

    /**
     * 让阴影定位组件位于可视范围内
     */
    useEffect(() => {
        shadow_widget &&
            shadow_widget_ref.current &&
            intersectionObserverInstance.observe(shadow_widget_ref.current);
        return () => {
            shadow_widget &&
                shadow_widget_ref.current &&
                intersectionObserverInstance.unobserve(
                    shadow_widget_ref.current
                );
        };
    }, [JSON.stringify(shadow_widget)]);

    const GetCurrentContainerHeight = () => {
        if (!layout) {
            return;
        }

        const { layout_type, mode, scale } = props;

        const current_height = getCurrentHeight(container_ref, props);

        const current_layout = layout.concat(
            shadow_widget ? [shadow_widget] : []
        );
        const { max_left, max_right, max_top, max_bottom } =
            getMaxLayoutBound(current_layout);

        // 如果没有宽高就是自适应模式
        if (layout_type === LayoutType.GRID) {
            const _h =
                max_bottom > current_height
                    ? max_bottom + padding.bottom
                    : current_height;

            setCanvasWrapperWidth(current_width);
            setCanvasWrapperHeight(_h);
            setCurrentHeight(_h);
            setTopOffset(0);
            setLeftOffset(0);
        } else {
            const calc_width = current_width * scale;
            const calc_height = current_height * scale;

            // 视窗的宽、高度
            const client_height = canvas_viewport.current?.clientHeight
                ? canvas_viewport.current?.clientHeight
                : 0;
            const client_width = canvas_viewport.current?.clientWidth
                ? canvas_viewport.current?.clientWidth
                : 0;

            // 计算水平、垂直偏移量
            if (mode === LayoutType.edit) {
                const ele_width = max_right * scale - max_left * scale;
                const ele_height = max_bottom * scale - max_top * scale;

                const l_offset =
                    calcOffset(client_width, calc_width + WRAPPER_PADDING) +
                    WRAPPER_PADDING / 2;
                const t_offset =
                    calcOffset(client_height, calc_height + WRAPPER_PADDING) +
                    WRAPPER_PADDING / 2;

                const wrapper_calc_width = Math.max(
                    calc_width > ele_width
                        ? calc_width + WRAPPER_PADDING
                        : ele_width + 2 * l_offset,
                    client_width
                );
                const wrapper_calc_height = Math.max(
                    calc_height > ele_height
                        ? calc_height + WRAPPER_PADDING
                        : ele_height + 2 * t_offset,
                    client_height
                );

                setCanvasWrapperWidth(wrapper_calc_width);
                setCanvasWrapperHeight(wrapper_calc_height);
                setCurrentHeight(current_height);
                setTopOffset(t_offset + Math.abs(max_top) * scale);
                setLeftOffset(l_offset + Math.abs(max_left) * scale);

                // return {
                //     t_scroll: Math.abs(max_top) * scale,
                //     l_scroll: Math.abs(max_left) * scale
                // };
            } else {
                const l_offset = calcOffset(client_width, calc_width);
                const t_offset = calcOffset(client_height, calc_height);

                setCanvasWrapperWidth(Math.max(calc_width, client_width));
                setCanvasWrapperHeight(Math.max(calc_height, client_height));
                setCurrentHeight(current_height);
                setTopOffset(t_offset);
                setLeftOffset(l_offset);
            }
        }
    };

    /** resize计算新的画布高度、元素容器大小和偏移量 */
    useEffect(() => {
        GetCurrentContainerHeight();
    }, [
        (props as DragLayoutProps).height,
        (props as DragLayoutProps).width,
        props.scale,
        is_window_resize
    ]);

    /** 清空选中 */
    const onClick = (e: React.MouseEvent) => {
        console.log('clearChecked');
        e.stopPropagation();
        setCurrentChecked(undefined);
    };

    const onDragEnter = (e: React.MouseEvent) => {
        e.preventDefault();
        console.log('onDragEnter', canvas_inner_count + 1);

        setCanvasInnerCount(canvas_inner_count + 1);

        e.persist();
        // console.log(e);
    };

    /** 处理拖拽出画布外没有隐藏shadow的情况 */
    const onDragLeave = (e: React.MouseEvent) => {
        console.log('onDragLeave', canvas_inner_count - 1);
        e.persist();
        setCanvasInnerCount(canvas_inner_count - 1);

        if (
            !canvas_ref.current!.contains(e.relatedTarget as Node) &&
            !shadow_widget?.is_float
        ) {
            // 如果是canvas内的子节点会被触发leave
            setShadowWidget(undefined);
            setOldShadowWidget(undefined);
            compact(layout!, grid.row_height);
            setLayout(layout);
        }
    };

    const dragToGridLayout = (layout: LayoutItem[]) => {
        return layout.map((w) => {
            return formatLayoutItem(w, grid);
        });
    };

    /** 拖拽添加 */
    const onDrop = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setOperatorType(OperatorType.dropover);
        setCanvasInnerCount(0);

        if (shadow_widget) {
            const grid_item = formatLayoutItem(shadow_widget!, grid);
            const item = (props as EditLayoutProps).onDrop?.(
                dragToGridLayout(layout ?? []),
                grid_item
            );

            setShadowWidget(undefined);
            setOldShadowWidget(undefined);

            if (item && item.i) {
                setCurrentChecked(item.i);
            }
        }
    };

    /** 对drop节点做边界计算以后再排序 */
    const formatDropItemBound = (pos: LayoutItem) => {
        const { min_x, min_y } = getCurrentBound(
            props.layout_type === LayoutType.GRID ? false : true
        );

        pos.x = clamp(
            pos.x,
            min_x,
            current_width - pos.w - props.item_margin[0]
        );
        pos.y = clamp(
            pos.y,
            min_y,
            current_height - pos.h - props.item_margin[1]
        );

        return pos;
    };

    const onDragOver = (e: React.MouseEvent) => {
        e.preventDefault();
        setOperatorType(OperatorType.drop);

        const collides = getCurrentMouseOverWidget(
            layout!,
            canvas_ref,
            e,
            props.scale
        );

        if (collides && collides.is_unhoverable) {
            setShadowWidget(undefined);
            setOldShadowWidget(undefined);
            compact(layout!, grid.row_height);
            setLayout(layout);
        } else {
            const drop_item = formatDropItemBound(
                getDropItem(canvas_ref, e, props, grid)
            );

            if (
                old_shadow_widget &&
                drop_item.x === old_shadow_widget.x &&
                drop_item.y === old_shadow_widget.y
            ) {
                return;
            }
            setShadowWidget(drop_item);
            setOldShadowWidget(copyObject(drop_item));

            const new_layout = [drop_item, ...layout!];
            compact(new_layout!, grid.row_height);
            // 排序新布局，保存旧布局
            setLayout(layout);
        }
    };

    /**
     * @author super-hui
     * @param item 添加节点
     * @param is_save 是否需要保存
     * @returns
     */
    const moveLayoutV1 = (item: ItemPos, is_save?: boolean) => {
        const { layout: dynamic_layout, shadow_pos } = dynamicProgramming(
            item,
            layout!,
            grid,
            props.item_margin
        );

        setShadowWidget(is_save || item.is_float ? undefined : shadow_pos);

        const new_layout = dynamic_layout.map((widget: LayoutItem) => {
            return widget.i === item.i
                ? Object.assign(
                      {},
                      widget,
                      is_save && !item.is_float ? shadow_pos : item
                  )
                : widget;
        });

        setLayout(new_layout);

        return dragToGridLayout(new_layout);
    };

    const getLayoutItem = (item: ItemPos) => {
        return layout!.find((l) => {
            return l.i == item.i;
        }) as LayoutItem;
    };

    const moveLayoutV2 = (item: ItemPos, is_save?: boolean) => {
        const current_item = getLayoutItem(item);
        const float_item = Object.assign({}, current_item, item);

        if (!current_item.is_float) {
            snapToGrid(item, grid);

            moveElement(layout!, current_item, item.x, item.y, grid.row_height);

            current_item.w = item.w;
            current_item.h = item.h;

            compact(layout!, grid.row_height);

            if (is_save) {
                setShadowWidget(undefined);
            } else {
                setShadowWidget(current_item);
            }
        }

        setLayout(
            layout!.map((w) => {
                return w.i === item.i && !is_save ? float_item : w;
            })
        );
        return dragToGridLayout(layout ?? []);
    };

    const getCurrentLayoutByItem = (
        type: OperatorType,
        item: ItemPos,
        is_save?: boolean
    ) => {
        setOperatorType(type);
        // return moveLayoutV1(item, is_save);
        return moveLayoutV2(item, is_save);
    };

    return (
        <div
            className={`react-drag-layout ${styles.container}`}
            ref={container_ref}
        >
            {/* 水平标尺 */}
            {canvas_viewport.current && props.need_ruler && (
                <HorizontalRuler
                    {...props}
                    width={current_width}
                    l_offset={l_offset!}
                    wrapper_width={wrapper_width}
                    setRulerHoverPos={setRulerHoverPos}
                    canvas_viewport={canvas_viewport}
                ></HorizontalRuler>
            )}

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                {/* 垂直标尺 */}
                {canvas_viewport.current && props.need_ruler && (
                    <VerticalRuler
                        {...props}
                        height={current_height}
                        t_offset={t_offset!}
                        wrapper_height={wrapper_height}
                        setRulerHoverPos={setRulerHoverPos}
                        canvas_viewport={canvas_viewport}
                    ></VerticalRuler>
                )}

                {/* 可视区域窗口 */}
                <div
                    style={{
                        overflow: 'auto',
                        position: 'relative',
                        flex: 1,
                        scrollBehavior: 'smooth'
                    }}
                    ref={canvas_viewport}
                    id={'canvas_viewport'}
                >
                    {/* 画板区域 */}
                    <div
                        id={'canvas_wrapper'}
                        ref={canvas_wrapper}
                        style={{
                            width: wrapper_width,
                            height: wrapper_height
                        }}
                        /** 阻止了onDragOver以后，onDrop事件才生效 */
                        onDrop={props.mode === LayoutType.edit ? onDrop : noop}
                        onDragOver={
                            props.mode === LayoutType.edit ? onDragOver : noop
                        }
                        onDragLeave={
                            props.mode === LayoutType.edit ? onDragLeave : noop
                        }
                        onDragEnter={
                            props.mode === LayoutType.edit ? onDragEnter : noop
                        }
                        onClick={onClick}
                    >
                        {/* 实际画布区域 */}
                        <div
                            ref={canvas_ref}
                            className={styles.canvas}
                            style={{
                                width: current_width,
                                height: current_height,
                                top: t_offset,
                                left: l_offset,
                                transform: `scale(${props.scale})`,
                                transformOrigin: '0 0',
                                overflow:
                                    props.mode === LayoutType.edit
                                        ? 'unset'
                                        : 'hidden',
                                paddingTop: padding.top,
                                paddingLeft: padding.left,
                                paddingBottom: padding.bottom,
                                paddingRight: padding.right
                            }}
                            onContextMenu={(e) => {
                                e.preventDefault();
                            }}
                        >
                            {shadow_widget && (
                                <WidgetItem
                                    ref={shadow_widget_ref}
                                    {...shadow_widget}
                                    width={current_width}
                                    height={current_height}
                                    bound={getCurrentBound(
                                        shadow_widget.is_float
                                    )}
                                    padding={padding}
                                    scale={props.scale}
                                    margin={props.item_margin}
                                    grid={grid}
                                    layout_type={props.layout_type}
                                    is_resizable={false}
                                    is_draggable={false}
                                >
                                    <div
                                        className={`placeholder ${styles.placeholder}`}
                                    ></div>
                                </WidgetItem>
                            )}

                            {React.Children.map(
                                props.children,
                                (child, idx) => {
                                    const widget = layout?.[idx];
                                    if (widget) {
                                        return (
                                            <WidgetItem
                                                layout_type={props.layout_type}
                                                key={widget.i}
                                                {...widget}
                                                {...child.props}
                                                padding={padding}
                                                grid={grid}
                                                bound={getCurrentBound(
                                                    widget.is_float
                                                )}
                                                children={child}
                                                width={current_width}
                                                height={current_height}
                                                scale={props.scale}
                                                margin={props.item_margin}
                                                is_resizable={
                                                    widget.is_resizable &&
                                                    checked_index === widget.i
                                                }
                                                setCurrentChecked={
                                                    setCurrentChecked
                                                }
                                                onDragStart={() => {
                                                    checked_index === widget.i
                                                        ? (
                                                              props as EditLayoutProps
                                                          ).onDragStart?.()
                                                        : noop;
                                                }}
                                                onDrag={(item) => {
                                                    if (
                                                        checked_index ===
                                                        widget.i
                                                    ) {
                                                        const layout =
                                                            getCurrentLayoutByItem(
                                                                OperatorType.drag,
                                                                item,
                                                                false
                                                            );
                                                        (
                                                            props as EditLayoutProps
                                                        ).onDrag?.(layout);
                                                    }
                                                }}
                                                onDragStop={(item) => {
                                                    if (
                                                        checked_index ===
                                                        widget.i
                                                    ) {
                                                        const layout =
                                                            getCurrentLayoutByItem(
                                                                OperatorType.dragover,
                                                                item,
                                                                true
                                                            );
                                                        (
                                                            props as EditLayoutProps
                                                        ).onDragStop?.(layout);
                                                    }
                                                }}
                                                onResizeStart={() => {
                                                    if (
                                                        checked_index ===
                                                        widget.i
                                                    ) {
                                                        (
                                                            props as EditLayoutProps
                                                        ).onResizeStart?.();
                                                    }
                                                }}
                                                onResize={(item) => {
                                                    if (
                                                        checked_index ===
                                                        widget.i
                                                    ) {
                                                        const layout =
                                                            getCurrentLayoutByItem(
                                                                OperatorType.resize,
                                                                item,
                                                                false
                                                            );
                                                        (
                                                            props as EditLayoutProps
                                                        ).onResize?.(layout);
                                                    }
                                                }}
                                                onResizeStop={(item) => {
                                                    if (
                                                        checked_index ===
                                                        widget.i
                                                    ) {
                                                        const layout =
                                                            getCurrentLayoutByItem(
                                                                OperatorType.resizeover,
                                                                item,
                                                                true
                                                            );
                                                        (
                                                            props as EditLayoutProps
                                                        ).onResizeStop?.(
                                                            layout
                                                        );
                                                    }
                                                }}
                                                onPositionChange={(item) => {
                                                    if (
                                                        checked_index ===
                                                        widget.i
                                                    ) {
                                                        const layout =
                                                            getCurrentLayoutByItem(
                                                                OperatorType.changeover,
                                                                item,
                                                                true
                                                            );
                                                        (
                                                            props as EditLayoutProps
                                                        ).onPositionChange?.(
                                                            layout
                                                        );
                                                    }
                                                }}
                                            />
                                        );
                                    } else {
                                        return <Fragment></Fragment>;
                                    }
                                }
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* {props.mode === LayoutType.edit && canvas_viewport.current && (
                <GuideLine
                    scale={(props as DragLayoutProps).scale}
                    t_offset={t_offset}
                    l_offset={l_offset}
                    guide_lines={props.guide_lines}
                    canvas_viewport={canvas_viewport}
                    ruler_hover_pos={ruler_hover_pos}
                    removeGuideLine={props.removeGuideLine}
                ></GuideLine>
            )} */}
        </div>
    );
};

ReactDragLayout.defaultProps = {
    scale: 1,
    cols: 10,
    row_height: 20,
    container_padding: [10],
    item_margin: [0, 0],
    mode: LayoutType.view,
    need_ruler: false,
    need_grid_bound: true,
    need_drag_bound: true
};

export default ReactDragLayout;
