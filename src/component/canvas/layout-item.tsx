import { WidgetItemProps, LayoutType } from '@/interfaces';
import isEqual from 'lodash.isequal';
import React, { memo, ReactElement, useRef } from 'react';
import { DEFAULT_BOUND } from '../layout/calc';
import { MIN_DRAG_LENGTH } from './calc';
import Draggable from './draggable';
import Resizable from './resizable';
import styles from './styles.module.css';

/**
 * WidgetItem、resizable、draggable（props、child）流转：
 * WidgetItem:
 * child: 调用方child
 * props: Canvas props
 *
 * draggable:
 * child: WidgetItem
 * props: resizable props
 *
 * resizable:
 * child: draggable
 * props: WidgetItem props
 */
const WidgetItem = (props: WidgetItemProps) => {
    const child = React.Children.only(props.children);
    const item_ref = useRef<HTMLDivElement>(null);

    const { i, x, y, w, h, is_float, is_draggable, is_resizable } = props;

    /** 和当前选中元素有关 */
    const handleKeyDown = (e: React.KeyboardEvent) => {
        const keycode_step = 3;

        switch (e.keyCode) {
            case 37: // ArrowLeft
                return {
                    x: x - keycode_step
                };

            case 38: // ArrowUp
                return {
                    y: y - keycode_step
                };

            case 39: // ArrowRight
                return {
                    x: x + keycode_step
                };

            case 40: // ArrowDown
                return {
                    y: y + keycode_step
                };
        }
        return undefined;
    };

    const new_child = React.cloneElement(child, {
        tabIndex: i,
        onMouseDown: () => {
            props.setCurrentChecked(i);
        },
        onKeyDown: (e: React.KeyboardEvent) => {
            if (is_float) {
                const keydown_pos = handleKeyDown(e);
                if (keydown_pos) {
                    props.onPositionChange?.({
                        ...{ x, y, h, w, i, is_float },
                        ...keydown_pos
                    });
                }
            }
        },
        ref: item_ref,
        id: `${
            child.props.id
                ? child.props.id + ' layout-item-' + i
                : 'layout-item-' + i
        }`,
        className: `${[child.props.className, styles.layout_item].join(' ')}`,
        style: {
            transform: `translate(${x}px, ${y}px)`,
            width: w,
            height: h,
            ...child.props.style
        }
    });

    const col_width = is_float ? MIN_DRAG_LENGTH : props.grid.col_width;
    const row_height = is_float ? MIN_DRAG_LENGTH : props.grid.row_height;

    return (
        <React.Fragment>
            <Resizable
                {...{ x, y, h, w, i, is_float }}
                scale={props.scale}
                is_resizable={is_resizable}
                onResizeStart={() => {
                    props.onResizeStart?.();
                }}
                onResize={({ x, y, h, w }) => {
                    props.onResize?.({ x, y, h, w, is_float, i });
                }}
                grid={{ col_width, row_height }}
                bound={
                    props.layout_type === LayoutType.DRAG && is_float
                        ? DEFAULT_BOUND
                        : props.bound
                }
                onResizeStop={({ x, y, h, w }) => {
                    props.onResizeStop?.({ x, y, h, w, is_float, i });
                }}
            >
                <Draggable
                    {...{ x, y, h, w, i, is_float }}
                    scale={props.scale}
                    is_draggable={is_draggable}
                    onDragStart={() => {
                        props.onDragStart?.();
                    }}
                    bound={
                        props.layout_type === LayoutType.DRAG && is_float
                            ? DEFAULT_BOUND
                            : props.bound
                            ? {
                                  bottom: props.bound.bottom - w,
                                  top: props.bound.top,
                                  left: props.bound.left,
                                  right: props.bound.right - h
                              }
                            : DEFAULT_BOUND
                    }
                    onDrag={({ x, y }) => {
                        props.onDrag?.({
                            x,
                            y,
                            w,
                            h,
                            is_float,
                            i
                        });
                    }}
                    onDragStop={({ x, y }) => {
                        props.onDragStop?.({
                            x,
                            y,
                            w,
                            h,
                            is_float,
                            i
                        });
                    }}
                >
                    {new_child}
                </Draggable>
            </Resizable>
        </React.Fragment>
    );
};

WidgetItem.defaultProps = {
    scale: 1,
    is_float: false,
    style: {}
};

export default memo(WidgetItem, compareProps);

function compareProps<T>(prev: Readonly<T>, next: Readonly<T>): boolean {
    return !Object.keys(prev)
        .map((key) => {
            if (
                [
                    'setCurrentChecked',
                    'onDragStart',
                    'onDrag',
                    'onDragStop',
                    'onResizeStart',
                    'onResize',
                    'onResizeStop',
                    'onPositionChange'
                ].includes(key)
            ) {
                return true;
            } else if (key === 'children') {
                return childrenEqual(prev['children'], next['children']);
            } else {
                return isEqual(prev[key], next[key]);
            }
        })
        .some((state) => state === false);
}

function childrenEqual(a: ReactElement, b: ReactElement): boolean {
    return isEqual(
        React.Children.map(a, (c) => c?.key),
        React.Children.map(b, (c) => c?.key)
    );
}
