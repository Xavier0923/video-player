import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
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
  videoSpeed: number = 0;
  sliderPercent: number = 0;
  @ViewChild('video') video!: ElementRef;
  constructor(private renderer: Renderer2){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  ngAfterViewInit(): void {
    console.log(this.video.nativeElement)
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.renderer.listen(this.video.nativeElement, 'loadeddata', () => {
      // console.log(this.video.nativeElement.duration)
      let time = moment.duration(this.video.nativeElement.duration, 'seconds')
      // 分
      let hour = time.hours();
      let minute = time.minutes();
      let second = time.seconds();
      this.totalTime = `${hour ? hour + ':' : ''}${minute ? minute + ':' : '00'}${second || '00'}`
    })

    this.renderer.listen(this.video.nativeElement, 'timeupdate', () => {
      // console.log('the video time is update!')
      this.currentTime = this.video.nativeElement.currentTime;
      // console.log('duration', this.video.nativeElement.duration)
      // console.log('currentTime', Math.round(this.currentTime))
      this.sliderPercent = Math.floor(Math.round(this.currentTime) % this.video.nativeElement.duration)
      // console.log('百分比', this.sliderPercent)
    })

  }

  // 播放/暫停
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
      this.renderer.setProperty(this.video.nativeElement, 'currentTime', this.video.nativeElement.currentTime + 10)
    } else {
      this.renderer.setProperty(this.video.nativeElement, 'currentTime', this.video.nativeElement.currentTime - 10)
    }
  }

  // 聲音是否靜音
  volumeMuted(){
    this.renderer.setProperty(this.video.nativeElement, 'muted', !this.video.nativeElement.muted)
    this.isMuted = !this.isMuted;
  }

  // 聲音大小聲
  volumeControl(event: any){
    this.renderer.setProperty(this.video.nativeElement, 'volume', event.value / 100)
  }

  // 移動時間點
  timeControl(event: any){
    console.log(event.value)
    this.renderer.setProperty(this.video.nativeElement, 'currentTime', event.value)
    this.currentTime = event.value;
  }

  // 放大/縮小
  fullScreen(){
    this.video.nativeElement.requestFullscreen();
    this.renderer.setProperty(this.video.nativeElement, 'controls', false)
  }

  // 打開設定
  openSetting(){
    this.showSetting = !this.showSetting;
  }

}
