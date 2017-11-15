import { Component } from '@angular/core';
import './Main';

@Component({
    selector: 'main',
    template: require('./Main.template')(),
})
export class MainComponent {
    private testVal = 'asdqwe';

    constructor() {
        debugger
    }
}
