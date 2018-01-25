//import { Strings } from '../../Core/Localization/Strings';

export class AlertModalModel {
    public Details: any[];
    constructor(
        public Message: string = "",
        //public Title: string = Strings.Titles.TITLE_SYSTEM_ALERT,
        //public ConfirmLbl: string = Strings.LBL_OK,
        public Title: string = 'System Alert',
        public ConfirmLbl: string = 'OK',
        public Size: string = "sm"
    ) {}
}
