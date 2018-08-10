import { ApiEntity } from './ApiEntity';
export class NameEntity extends ApiEntity {
    constructor(public name: string, public url: string) {
        super(url);
    }
}
