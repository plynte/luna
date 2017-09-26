/**
 * Created by liuzheng on 2017/9/16.
 */

import {Component, OnInit} from '@angular/core';
import {Logger} from 'angular2-logger/core';
import {AppService, DataStore, User} from '../app.service';
import {NgForm} from '@angular/forms';

declare let jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  providers: [AppService]
})
// ToDo: ngEnter and redirect to default page

export class LoginComponent implements OnInit {
  DataStore = DataStore;
  User = User;
  loginBotton = 'login to your account';

  constructor(private _appService: AppService,
              private _logger: Logger) {
    this._logger.log('login.ts:LoginComponent');
  }


  onSubmit(f: NgForm) {
    if (f.valid) {
      this._appService.login();
    } else {
      this._logger.error("the form not valid")
    }
  }

  ngOnInit() {
    jQuery('#form').fadeIn('slow');
    // this._router.navigate(['login']);
    // jQuery('nav').hide();
    const vm = this;
    window.onresize = function () {
      if (!User.logined) {
        vm.background();
      }
    };

    this.timer();

  }

  timer() {
    if (DataStore.windowsize[0] !== document.documentElement.clientWidth ||
      DataStore.windowsize[1] !== document.documentElement.clientHeight &&
      !User.logined) {
      jQuery(window).trigger('resize');
      DataStore.windowsize = [document.documentElement.clientWidth, document.documentElement.clientHeight];
    }
    setTimeout(() => {
      this.timer();
    }, 33);
  }

  background() {
    const q = jQuery('#q')[0];
    const width = q.width = document.documentElement.clientWidth;
    const height = q.height = document.documentElement.clientHeight;
    const letters = [];
    for (let i = 0; i < 256; i++) {
      letters.push(Math.round(Math.random() * i * 33));
    }
    const draw = function () {
      q.getContext('2d').fillStyle = 'rgba(0,0,0,.05)';
      q.getContext('2d').fillRect(0, 0, width, height);
      q.getContext('2d').fillStyle = '#0F0';
      letters.map(function (y_pos, index) {
        const text = String.fromCharCode(65 + Math.random() * 26);
        const x_pos = index * 10;
        q.getContext('2d').fillText(text, x_pos, y_pos);
        letters[index] = (y_pos > 758 + Math.random() * 1e4) ? 0 : y_pos + 10;
      });
    };
    setInterval(draw, 33);
  }

}