import {Directive, TemplateRef} from '@angular/core';

@Directive({
    selector: '[hTemplate]',
})
export class HTemplateDirective {
    constructor(public template: TemplateRef<any>) {
    }
}
