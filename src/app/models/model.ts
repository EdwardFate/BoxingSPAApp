export enum Roles {
    Default,
    Admin
}


export class UserLogin {
    constructor(
        public Login: string,
        public Password: string
    ) { }
}

export class SportsmanRegistration{
    constructor(
        public Name: string,
        public Surname: string,
        public TrainerInfo: TrainerShorInfo
    ){}
}

export class Sportsman {
    constructor(
    public Name: string,
    public Surname: string,
    public Trainer: Trainer


    ) { }
}

export class Trainer {
    constructor(
        public Name: string,
        public Surname: string,
        public Email: string,
        public Role: Roles,
        public Sportsmen: Sportsman[]
    ) { }


}

export class TrainerShorInfo{
    constructor(
        public Name:string,
        public Surname: string
    ){}
}


export class TrainerRegistration {
    constructor(
        public Name: string,
        public Surname: string,
        public Email: string,
        public Password: string,
        public PassworConfirm: boolean,

        public Role: Roles
    ) { }
}

