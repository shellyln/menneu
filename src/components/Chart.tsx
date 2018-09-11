// Copyright (c) 2018, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


/** @jsx rdgt.createElement */
import * as rdgt               from 'red-agate/modules';
import { SvgCanvas,
         SvgCanvas2DGradient } from 'red-agate-svg-canvas/modules';
import * as ChartJs            from 'chart.js';
import { default as isNode }   from '../lib/is-node';

// tslint:disable-next-line:no-var-requires
const plugin = require('chartjs-plugin-datalabels');



if (isNode && !((global as any).CanvasGradient)) {
    (global as any).CanvasGradient = SvgCanvas2DGradient;
}


export interface ChartProps extends rdgt.ShapeBaseProps, rdgt.ImagingShapeBasePropsMixin {
    width: number;
    height: number;
    useParentSvg?: boolean;
    settings: any;
    displayDataLabel?: boolean;
}


export class Chart extends rdgt.RedAgateComponent<ChartProps> {
    public constructor(props: ChartProps) {
        super(props);
    }

    public transform(): rdgt.RedAgateNode {
        const c = (<rdgt.Canvas>{(ctx: SvgCanvas) => {
            // TODO: following members are not exist in the SvgCanvas.
            (ctx as any).canvas = {
                width: this.props.width,
                height: this.props.height,
                style: {
                    width: `${this.props.width}${this.props.unit || 'px'}`,
                    height: `${this.props.height}${this.props.unit || 'px'}`,
                },
            };
            ctx.fontHeightRatio = 2;
            const el = { getContext: () => ctx };

            const opts = Object.assign({}, this.props.settings);
            if (! opts.options) {
                opts.options = {};
            }
            opts.options.animation = false;
            opts.options.devicePixelRatio = 1;
            opts.options.events = [];
            opts.options.responsive = false;

            if (! this.props.displayDataLabel) {
                if (! opts.options.plugins) {
                    opts.options.plugins = {};
                }
                opts.options.plugins.datalabels = false;
            }

            const chart = new ChartJs.Chart(el as any, opts);

            if (this.props.useParentSvg) {
                delete (ctx as any).canvas;
            }
        }}</rdgt.Canvas>);

        if (this.props.useParentSvg) {
            return c;
        } else {
            return (
                <rdgt.Svg
                    id={this.props.id}
                    width={this.props.width}
                    height={this.props.height}
                    unit={this.props.unit}
                    asImgTag={this.props.asImgTag}
                    asElementStyle={this.props.asElementStyle}
                    asDataUrl={this.props.asDataUrl}
                >{c}</rdgt.Svg>
            );
        }
    }
}
