import { Component } from '@angular/core';
import { NavController ,Platform,AlertController } from 'ionic-angular';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite';
import { User } from '../../user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  flagKey;
  myDatabase:SQLiteObject;
  myUser:User;
  constructor(public navCtrl: NavController,public sqlite:SQLite,public platform:Platform,public alertCtrl:AlertController) {
    // this.initDatabase();
    let user=new User();
    user.email="wz@163.com";
    user.username="wwh";
    this.myUser=user;
  
  }
  alertInfo(msg)
  {
    let alert=this.alertCtrl.create({
      title:'notice',
      message:msg,
      buttons:['ok']
    });
    alert.present();
  }
  initDatabase()
  {
    if(this.platform.is('cordova'))
    {
          this.sqlite.create({
              name:'my.db',
              location:'default'
          }).then((database:SQLiteObject)=>{
            database.executeSql('CREATE TABLE IF NOT EXISTS users(email VARCHAR(320) PRIMARY KEY, username VARCHAR(20) NOT NULL, password VARCHAR(30) NOT NULL, gender BOOLEAN, age TINYINT, intro VARCHAR(300), phone CHAR(11), location VARCHAR(100));',[]).then(()=>{
              console.log('executesql success');
              this.alertInfo('users table create success.')
              this.myDatabase=database;
            }).catch((e)=>{
              console.log(e+'!!!!!!');
            });
          }).catch(e=>{console.log(e+'??????')});
        }
        else
        {
          console.log('in browser not use!');
        }

  }
  insertIntoUserTable(user: User) {
    this.myDatabase.executeSql('INSERT INTO users VALUES (?, ?, ?, NULL, NULL, NULL, NULL, NULL);', [user.email, user.username, user.password]).then(() => {
      console.log('insert into users table successfully');
    this.alertInfo("insert Ok");
  }).catch(e => console.log(e));
  }
  myInsertOne(email,name,pass){
    let user=new User();
    user.email=email;
    user.username=name;
    user.password=pass;
    user.gender=true;
    user.age=40;
    this.insertIntoUserTable(user);
  }
  //
  selectUserInfo()
  {
    this.myDatabase.executeSql('select email,username from users').then((res)=>{
        // this.alertInfo(JSON.stringify(res.rows.item(0)[0]));
        this.myUser.email=res.rows.item(0).email;
        this.myUser.username=res.rows.item(0).username;
        this.alertInfo(this.myUser.username);
    }).catch((e)=>{
      console.log(e);
      this.alertInfo(e);
    });
  }
  setStorage()
  {
    window.localStorage.setItem("flagKey","wz13946987696");

  }
  getStorage(){
    this.flagKey=window.localStorage.getItem("flagKey");
  }
}
