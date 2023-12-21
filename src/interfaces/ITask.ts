interface ITask{
    TaskId?:                      number;
    ProcessId?:                   number;
    StatusName?:                  string;
    ProcessClassName?:            string;
    ProcessBaseReference?:        string;
    ProcessTheme1?:               string;
    ProcessTheme2?:               string;
    ProcessTheme3?:               string;
    ProcessTheme4?:               string;
    ProcessTheme5?:               string;
    ProcessTheme6?:               string;
    ProcessTheme7?:               string;
    ProcessTheme8?:               string;
    ProcessTheme9?:               string;
    ProcessTheme10?:              string;
    TaskClassCode?:               string;
    TaskClassName?:               string;
    ArrivalDate?:                 Date;
    Deadline?:                    Date;
    NoticeDate?:                  Date;
    OriginalStartDatePrevision?:  Date;
    OriginalEndDatePrevision?:    Date;
    CurrentStartDatePrevision?:   Date;
    CurrentEndDatePrevision?:     Date;
    NameOfStartMessageCreator?:   string;
    NatureOfStartMessageCreator?: string;
    IsReclaimable?:               boolean;
    Project?:                     string;
}

export default ITask;