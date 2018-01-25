export class DataGeneratorHelper {
    private static _WORDSARRAY: string[] = [
        'sissequisl', 'inci', 'blan', 'heniatuer', 'in', 'ex', 'essed', 'tie', 'del', 'estrud', 'et', 'ute', 'ea', 'alisism', 'oloborpero',
        'ea', 'coreetuercil', 'ipit', 'ut', 'nulluptate', 'eugait', 'nonsequip', 'estrud', 'molore', 'feu', 'faccum', 'in', 'veliquat',
        'ut', 'aliquisl', 'exerat', 'in', 'voloreriusci', 'tiscilisi', 'met', 'core', 'do', 'dolorpe', 'raestio', 'nsenim', 'num', 'irit',
        'lor', 'iriustie', 'ting', 'erci', 'erostrud', 'tatum', 'er', 'alit', 'dipis', 'ectem', 'eugue', 'moloborem', 'nibh', 'eum', 'dunt',
        'alisi', 'blaor', 'sumsan', 'hent', 'ad', 'ent', 'ipsum', 'vel', 'dolut', 'numsandignim', 'dolor', 'ate', 'dolobor', 'sumsan',
        'volutatio', 'coreros', 'tincipi', 'scidunt', 'lor', 'si', 'tiniamet,', 'cor', 'alit', 'velessi', 'estion', 'utpate', 'dolutpate',
        'te', 'et', 'luptatet', 'aut', 'in', 'euis', 'nullutpat', 'il', 'ectem', 'ipsum', 'dit', 'ea', 'facing', 'ea', 'facin', 'ute', 'magna',
        'acilism', 'odigniam', 'sequis', 'ercipsummy', 'nit', 'luptat', 'alit', 'lum', 'alisim', 'nos', 'aciduis', 'sequipisim', 'zzriusto',
        'del', 'dolore', 'del', 'exero', 'odit', 'vent', 'lum', 'ip', 'eugait', 'velendre', 'tetum', 'nons', 'nonsed', 'dignisl', 'dolobortie',
        'do', 'exer', 'aut', 'eril', 'ing', 'essenim', 'et', 'ulla', 'faccum', 'irilisit', 'lortie', 'dui', 'blandig', 'niatuercilla', 'con',
        'ullut', 'laoreet', 'luptatie', 'eliquip', 'sustisl', 'iustrud', 'magna', 'faciduissed', 'ming', 'euisis', 'adiam', 'quip', 'ea',
        'conulput', 'alit', 'augait', 'ilis', 'dunt', 'acipis', 'dolobor', 'percing', 'ecte', 'consequipis', 'augait', 'doloreet', 'et',
        'prating', 'essi', 'et', 'il', 'ipsuscip', 'exerit', 'ad', 'doloborperat', 'autationulla', 'feugue', 'facilis', 'ex', 'ea', 'alit',
        'accum', 'iusciduisim', 'del', 'ute', 'vel', 'dunt', 'wisim', 'am', 'quat', 'acinis', 'at,', 'vel', 'eros', 'estin', 'elit', 'irilis',
        'et', 'ad', 'dolorting', 'endigna', 'facilit', 'iure', 'erostin', 'henim', 'quat', 'alit', 'iurer', 'sequism', 'olenit', 'incinci',
        'liquissed', 'diam', 'vel', 'in', 'er', 'aliquam', 'zzriusc', 'iliquipsum', 'ilisl', 'illutpat', 'vullamet', 'at', 'isim', 'quis',
        'exer', 'aut', 'acidunt', 'adion', 'exer', 'iriusci', 'pismodi', 'onsequam', 'iure', 'moloreet', 'wis', 'nisi', 'tat', 'os', 'nisse',
        'dolore', 'dolor', 'sequisi', 'tem', 'iure', 'conulluptat', 'venibh', 'ectet', 'nostrud', 'molorer', 'suscil', 'dolore', 'modipit',
        'ilit', 'voloboreetum', 'venibh', 'erilisit', 'numsandio', 'dolortie', 'min', 'henim', 'do', 'erat', 'ip', 'eumsandigna', 'faci',
        'blaore', 'min', 'vulput', 'la', 'faciduis', 'nim', 'ero', 'consenim', 'iure', 'eugiate', 'do', 'conse', 'consent', 'wis', 'amcon', 'ea',
        'faccummy', 'nit', 'prat,', 'velendr', 'erciliquis', 'alis', 'autetuer', 'adignibh', 'et', 'lum', 'nulluptat', 'wisim', 'volore',
        'vullandiamet', 'dolesed', 'molobor', 'si', 'ing', 'er', 'ate', 'tie', 'duiscid', 'uipismodip', 'et', 'praessi', 'iduip', 'exero', 'dit',
        'ullaorero', 'odipis', 'et', 'sis', 'dolesed', 'euiscidunt', 'aliquam'
    ];

    public static RandomWords(words: number, maxLength: number): string {
        if (words <= 0) {
            words = 1;
        }
        let randomWords: string = '';
        for (let i: number = 0; i < words; i++) {
            randomWords += this._WORDSARRAY[this.RandomInteger(0, 319)] + ' ';
        }

        // if (randomWords.length > maxLength) {
        //     randomWords = randomWords.Substring(0, maxLength);
        // }

        return randomWords.trim();
    }

    public static RandomInteger(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    public static RandomBoolean(): boolean {
        return this.RandomInteger(1, 100) > 50;
    }

    public static RandomIp(port?: boolean): string {
        let ip: string = '';
        for (let i: number = 0; i < 4; i++) {
            ip += this.RandomInteger(1, 255);
            if (i < 3) {
                ip += '.';
            }
        }
        if (port) {
            ip += ':' + this.RandomInteger(1, 65000);
        }
        return ip;
    }
}
