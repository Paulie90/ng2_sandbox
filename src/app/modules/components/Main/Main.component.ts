import {Component} from '@angular/core';

@Component({
    selector: 'main',
    template: require('./Main.template')()
})
export class MainComponent {
    testVal = 'asdqwe';

    constructor() {
    }
}