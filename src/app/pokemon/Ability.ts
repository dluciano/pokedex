import { NameEntity } from './NameEntity';
export class Ability extends NameEntity {
    constructor(public slot: number, public name: string, public url: string) {
        super(name, url);
    }
}
