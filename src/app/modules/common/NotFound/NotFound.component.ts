import {Component} from '@angular/core';

@Component({
    selector: 'not-found',
    template: require('./NotFound.template')()
})
export class NotFoundComponent {
    constructor() {
    }
}
