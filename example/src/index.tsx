import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useNavigate
} from 'react-router-dom';

import DefaultLayout from './demo/default';
import DraggableGridStaticLayout from './demo/draggable/grid/static';
import DraggableGridResponsiveLayout from './demo/draggable/grid/responsive';
import DraggableDragStaticLayout from './demo/draggable/drag/static';
import DraggableDragResponsiveLayout from './demo/draggable/drag/responsive';

import ResizableGridStaticLayout from './demo/resizable/grid/static';
import ResizableGridResponsiveLayout from './demo/resizable/grid/responsive';
import ResizableDragStaticLayout from './demo/resizable/drag/static';
import ResizableDragResponsiveLayout from './demo/resizable/drag/responsive';

import DropDragStaticLayout from './demo/drop/drag/static';
import DropGridResponsiveLayout from './demo/drop/grid/responsive';

import NestedGridResponsiveLayout from './demo/nested/grid/responsive';
import ScaleDragLayout from './demo/scale';
import RulerLayout from './demo/ruler';
import { Menu } from 'antd';

function Router() {
    const history = useNavigate();

    const router_lists = [
        {
            name: 'default',
            path: '/',
            element: <DefaultLayout />
        },
        /* draggable */
        {
            name: 'draggable grid static',
            path: '/draggable/grid-static',
            element: <DraggableGridStaticLayout />
        },
        {
            name: 'draggable grid responsive',
            path: '/draggable/grid-responsive',
            element: <DraggableGridResponsiveLayout />
        },
        {
            name: 'draggable drag static',
            path: '/draggable/drag-static',
            element: <DraggableDragStaticLayout />
        },
        {
            name: 'draggable drag responsive',
            path: '/draggable/drag-responsive',
            element: <DraggableDragResponsiveLayout />
        },
        /* resizable */
        {
            name: 'resizable grid static',
            path: '/resizable/grid-static',
            element: <ResizableGridStaticLayout />
        },
        {
            name: 'resizable grid responsive',
            path: '/resizable/grid-responsive',
            element: <ResizableGridResponsiveLayout />
        },
        {
            name: 'resizable drag static',
            path: '/resizable/drag-static',
            element: <ResizableDragStaticLayout />
        },
        {
            name: 'resizable drag responsive',
            path: '/resizable/drag-responsive',
            element: <ResizableDragResponsiveLayout />
        },
        /* drop */
        {
            name: 'drop drag static',
            path: '/drop/drag-static',
            element: <DropDragStaticLayout />
        },
        {
            name: 'drop grid responsive',
            path: '/drop/grid-responsive',
            element: <DropGridResponsiveLayout />
        },

        {
            name: 'nested grid responsive',
            path: 'nested',
            element: <NestedGridResponsiveLayout />
        },
        {
            name: 'scale drag',
            path: 'scale',
            element: <ScaleDragLayout />
        },
        { name: 'ruler', path: 'ruler', element: <RulerLayout /> }
    ];

    return (
        <div style={{ display: 'flex', width: '100%', height: '100%' }}>
            <Menu
                onClick={(e) => {
                    history(e.key);
                }}
                mode='vertical'
            >
                {router_lists.map((r) => {
                    return <Menu.Item key={r.path}>{r.name}</Menu.Item>;
                })}
            </Menu>

            <div style={{ flex: 1, overflow: 'hidden' }}>
                <Routes>
                    {router_lists.map((r) => {
                        return (
                            <Route
                                key={r.name}
                                path={r.path}
                                element={r.element}
                            />
                        );
                    })}
                    <Route path='*' element={<Navigate to='/' />} />
                </Routes>
            </div>
        </div>
    );
}

ReactDOM.render(
    <BrowserRouter>
        <Router />
    </BrowserRouter>,
    document.getElementById('root')
);
