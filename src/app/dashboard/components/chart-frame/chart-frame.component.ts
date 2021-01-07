import {
    AfterContentInit,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList,
    TemplateRef,
    ViewChild
} from '@angular/core';
import {HTemplateDirective} from '../../directives/h-template.directive';

@Component({
    selector: 'app-chart-frame',
    templateUrl: './chart-frame.component.html',
    styleUrls: ['./chart-frame.component.scss'],
})
export class ChartFrameComponent implements OnInit, AfterContentInit {
    // Input
    @Input() title = 'Card Title';
    @Input() load = false;
    @Input() hLink = '';
    @Input() height = '50vh';
    @Input() toggle = true;
    @Input() isCollapse = false;
    // Output
    @Output() loadChange = new EventEmitter();
    // View Child
    @ViewChild('card') card: any;
    // Template
    @ContentChildren(HTemplateDirective) templates: QueryList<HTemplateDirective>;
    hTemplate: TemplateRef<any>;

    constructor() {
    }

    ngAfterContentInit(): void {
        if (this.isCollapse) {
            this.card.toggle();
        }
        if (this.templates.length > 0) {
            this.templates.forEach((item, i) => {
                this.hTemplate = item.template;
                if (i === 0) {
                    return;
                }
            });
        }
    }

    ngOnInit() {
    }

}
