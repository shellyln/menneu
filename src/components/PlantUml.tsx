// Copyright (c) 2018, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


/** @jsx rdgt.createElement */
import * as rdgt    from 'red-agate/modules';
import { Markdown } from './Markdown';
import { raw }      from './raw';



export const PlantUmlLite = (props: rdgt.ComponentProps) =>
    <Markdown>
        @startuml{'\n'}
        {raw(props.children)}{'\n'}
        @enduml
    </Markdown>;


interface HtmlImageProps extends rdgt.ComponentProps {
    src: string;
}


class HtmlImage extends rdgt.RedAgateComponent<HtmlImageProps> {
    public constructor(props: HtmlImageProps) {
        super(Object.assign({ width: 1, height: 1 }, props));
    }

    public transform() {
        return (<rdgt.Image src={this.props.src} width={1} height={1}></rdgt.Image>);
    }

    public render(contexts: Map<string, any>, children: string) {
        return (children
            .replace(/style="[A-Za-z0-9:; ]+"/, ' ')
        );
    }
}


export class PlantUml extends rdgt.RedAgateComponent<rdgt.ComponentProps> {
    public constructor(props: rdgt.ComponentProps) {
        super(props);
    }

    private uml: rdgt.RedAgateNode;
    private content = '';

    public transform(): rdgt.RedAgateNode {
        this.uml =
            <Markdown>
                @startuml{'\n'}
                {raw(this.props.children)}{'\n'}
                @enduml
            </Markdown>;
        return [];
    }

    public defer() {
        return new Promise<void>((resolve, reject) => {
            rdgt.renderAsHtml(this.uml)
            .then(html => {
                const re = html.match(/src="(\S+)"/);
                if (re) {
                    rdgt.renderAsHtml(<HtmlImage src={re[1]} ></HtmlImage>)
                    .then(h => {
                        this.content = h;
                        resolve();
                    })
                    .catch(e => reject(e));
                } else {
                    reject('[PlantUml] Error: ' + html);
                }
            })
            .catch(e => reject(e));
        });
    }

    public render(contexts: Map<string, any>, children: string) {
        return this.content;
    }
}
