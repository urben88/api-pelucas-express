export interface Error {
    name:   string;
    errors: ErrorElement[];
}

export interface ErrorElement {
    message:       string;
    type:          string;
    path:          string;
    value:         string;
    origin:        string;
    instance:      Instance;
    validatorKey:  string;
    validatorName: string;
    validatorArgs: ValidatorArg[];
    original:      Original;
}

export interface Instance {
    nombre:    string;
    apellidos: string;
    email:     string;
    password:  string;
    updatedAt: Date;
    createdAt: Date;
}

export interface Original {
    validatorName: string;
    validatorArgs: ValidatorArg[];
}

export interface ValidatorArg {
    msg:                   string;
    allow_display_name:    boolean;
    require_display_name:  boolean;
    allow_utf8_local_part: boolean;
    require_tld:           boolean;
    blacklisted_chars:     string;
    ignore_max_length:     boolean;
    host_blacklist:        any[];
}
