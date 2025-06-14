class Store{
otp = new Map<string,string>()
    timeOuts = new Map<string,NodeJS.Timeout>()
    constructor(){
    }
    addOtp(email:string, otp:string){
        this.otp.set(email,otp)
        this.timeOuts.set(email, setTimeout(() => {
            this.otp.delete(email)
            this.timeOuts.delete(email)
        }, 310000))
    }
    getOtp(email:string){
        const data = this.otp.get(email)
        this.otp.delete(email)
        if(this.timeOuts.has(email)){
            clearTimeout(this.timeOuts.get(email))
            this.timeOuts.delete(email)
        }
        return data
    }
}
const otpStore = new Store()
export default otpStore