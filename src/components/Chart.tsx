// Copyright (c) 2018, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


/** @jsx rdgt.createElement */
import * as rdgt  from 'red-agate/modules';
import * as React from 'react';

import { ReactHost }             from 'red-agate-react-host/modules';



export interface ChartProps extends rdgt.ComponentProps {
    settings: any;
}


export class Chart extends rdgt.RedAgateComponent<ChartProps> {
    public constructor(props: ChartProps) {
        super(props);
    }

    public transform(): rdgt.RedAgateNode {
        return (
            <ReactHost element={
                React.createElement(/* ReactChart as any */ (p) => React.createElement('span', {}, 'chart'), this.props.settings)
            }></ReactHost>
        );
    }
}
