import '../config/module-alias'
import { PersonController } from '@/main/controllers';

const p = new PersonController();
console.log(p.speak('Sandro'));
console.log(p.speak());
