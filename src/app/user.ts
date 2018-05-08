export class User{
    public id: number;
    public name: string;
    public password: string;
    public unlocked: number;
    public userLevel: UserLevel[];

}
export class UserLevel{
    public id: number;
    public time: number;
}