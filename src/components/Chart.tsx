// Copyright (c) 2018, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


/** @jsx rdgt.createElement */
import * as rdgt     from 'red-agate/modules';
import { SvgCanvas } from 'red-agate-svg-canvas/modules';
import * as ChartJs  from 'chart.js';



export interface ChartProps extends rdgt.ComponentProps {
    width: number;
    height: number;
    unit?: string;
    useParentSvg?: boolean;
    settings: any;
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
                    width: `${this.props.width}px`,
                    height: `${this.props.height}px`,
                },
            };
            (ctx as any).measureText = (text: string) => {
                const re = ctx.font.match(/(\d+px)/);
                const size = re ? Number.parseFloat(re[1]) : 9;
                return { width: 1.333 * size * text.length };
            };
            (ctx as any).clearRect = (x: number, y: number, w: number, h: number) => {
                ctx.save();
                ctx.fillStyle = 'white';
                ctx.fillRect(x, y, w, h);
                ctx.restore();
            };
            const el = { getContext: () => ctx };

            const opts = Object.assign({}, this.props.settings);
            if (! opts.options) {
                opts.options = {};
            }
            opts.options.animation = false;
            opts.options.devicePixelRatio = 1;
            opts.options.events = [];
            opts.options.responsive = false;

            const chart = new ChartJs.Chart(el as any, opts);

            if (this.props.useParentSvg) {
                delete (ctx as any).canvas;
                delete (ctx as any).measureText;
                delete (ctx as any).clearRect;
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
                >{c}</rdgt.Svg>
            );
        }
    }
}
