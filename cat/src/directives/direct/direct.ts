import { Directive } from '@angular/core';

/**
 * Generated class for the DirectDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[direct]' // Attribute selector
})
export class DirectDirective {

  constructor() {
    console.log('Hello DirectDirective Directive');
  }

}
