// Copyright (c) 2018, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


/** @jsx rdgt.createElement */
import * as rdgt               from 'red-agate/modules';
import { SvgCanvas,
         SvgCanvas2DGradient } from 'red-agate-svg-canvas/modules';
import { globalObj }           from 'liyad/modules/s-exp/global-this';

// NOTE: hack bad .d.ts definition for ESM.
import * as ChartJs_ from 'chart.js';
const ChartJs: typeof ChartJs_ = (ChartJs_ as any).default || ChartJs_;

import 'chartjs-plugin-datalabels';



const g = globalObj;


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
                // TODO: "getAttribute" is needed running on browsers.
                //       Chart.js "platform.acquireContext" have platform fallback mechanism.
                // See https://github.com/chartjs/Chart.js/pull/4591#issuecomment-319575939
                getAttribute: (prop: string) => {
                    switch (prop) {
                        case 'width':  return this.props.width;
                        case 'height': return this.props.height;
                    }
                    return void 0;
                },
                getContext: () => ctx,
                width: this.props.width,
                height: this.props.height,
                style: {
                    width: `${this.props.width}${this.props.unit || 'px'}`,
                    height: `${this.props.height}${this.props.unit || 'px'}`,
                },
            };
            ctx.fontHeightRatio = 2;
            const el = (ctx as any).canvas;

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

            const savedGradient = g.CanvasGradient;
            g.CanvasGradient = SvgCanvas2DGradient;
            try {
                const chart = new ChartJs.Chart(el as any, opts);
            } finally {
                if (savedGradient) {
                    g.CanvasGradient = savedGradient;
                }
            }

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
