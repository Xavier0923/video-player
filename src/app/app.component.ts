import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'video-test';
  isPlay: boolean = false;
  volume: number | null = 50;
  isMuted: boolean = false;
  totalTime: string = '';
  currentTime: number = 0;
  showSetting: boolean = false;
  @ViewChild('video') video!: ElementRef;
  constructor(){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.video.nativeElement.onloadeddata = () => {
      console.log(this.video.nativeElement.duration)
      let time = moment.duration(this.video.nativeElement.duration, 'seconds')
      // 分
      let hour = time.hours();
      let minute = time.minutes();
      let second = time.seconds();
      this.totalTime = `${hour ? hour + ':' : ''}${minute ? minute + ':' : '0'}${second || '00'}`
    }

  }

  // 播放/暫停
  // @HostListener('window:keydown.space', ['$event'])
  playVideo(e?: KeyboardEvent){
    console.log(e)
    if(!this.isPlay){
      this.video.nativeElement.play();
    } else {
      this.video.nativeElement.pause();
    }
    this.isPlay = !this.isPlay;

  }

  // 快轉/倒退
  dataSkip(value: number){
    if(value > 0){
      this.video.nativeElement.currentTime += 10
    } else {
      this.video.nativeElement.currentTime -= 10
    }
  }

  // 聲音是否靜音
  volumeMuted(){
    this.video.nativeElement.muted = !this.video.nativeElement.muted;
    this.isMuted = !this.isMuted;
  }

  // 聲音大小聲
  volumeControl(event: any){
    this.video.nativeElement.volume = event.value / 100
  }

  // 移動時間點
  timeControl(event: any){
    this.video.nativeElement.currentTime = event.value;
    this.currentTime = event.value;
  }

  // 放大/縮小
  fullScreen(){
    this.video.nativeElement.requestFullscreen();
    this.video.nativeElement.controls = false;
  }

  // 打開設定
  openSetting(){
    this.showSetting = !this.showSetting;
  }

}
