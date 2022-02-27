import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import {
    ReactDragLayout,
    LayoutType,
    LayoutItem,
    ReactLayoutContext,
    ItemPos
} from 'react-drag-layout';
import 'react-drag-layout/dist/index.css';

const DropGridResponsiveLayout = () => {
    const [widgets, setWidgets] = useState<LayoutItem[]>([]);

    useEffect(() => {
        setWidgets(generateLayout());
    }, []);

    function generateLayout() {
        return Array.from({ length: 6 }).map((_, i) => {
            const random = parseInt((Math.random() * 10).toFixed());
            return {
                w: 2,
                h: 10,
                i: i.toString(),
                x: random,
                y: random,
                is_resizable: false,
                is_draggable: true,
                is_float: false
            };
        });
    }

    return (
        <div
            style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '4px 10px'
                }}
            >
                <Button
                    type='primary'
                    style={{ marginRight: 10 }}
                    draggable={true}
                >
                    拖拽添加
                </Button>
            </div>
            <ReactLayoutContext>
                <ReactDragLayout
                    need_ruler
                    layout_type={LayoutType.GRID}
                    mode={LayoutType.edit}
                    container_padding={[10]}
                    item_margin={[10, 10]}
                    getDroppingItem={() => {
                        return {
                            h: 5,
                            w: 2,
                            i: 'drop_element'
                        };
                    }}
                    onDrop={(layout: LayoutItem[], item: ItemPos) => {
                        const drop_element = {
                            ...item,
                            i: widgets.length.toString(),
                            is_resizable: true,
                            is_draggable: true
                        };
                        const new_widgets = layout.concat([drop_element]);
                        setWidgets(new_widgets);
                        return drop_element;
                    }}
                    onDragStop={(layout: LayoutItem[]) => {
                        console.log('onDragStop');
                        setWidgets(layout);
                    }}
                >
                    {widgets.map((w) => {
                        return (
                            <div
                                key={w.i}
                                data-drag={w}
                                style={{
                                    border: '1px solid',
                                    padding: 10
                                }}
                            >
                                我是第{w.i}个div, height: {w.h}, width:
                                {w.w}
                            </div>
                        );
                    })}
                </ReactDragLayout>
            </ReactLayoutContext>
        </div>
    );
};

export default DropGridResponsiveLayout;
