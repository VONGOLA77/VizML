/* A pure measured-time clock, shared by the UI and deterministic unit tests. */
((host) => {
    'use strict';
    class ArenaTimelineClock {
        constructor(tracks, speed=0.001) {
            this.tracks=tracks;
            this.duration=Math.max(0,...Object.values(tracks).map(t=>t.duration_ms));
            this.time=0;this.speed=speed;this.playing=false;this.last=null;
        }
        tick(now) {
            if (this.playing && this.last !== null) this.time=Math.min(this.duration,this.time+Math.max(0,now-this.last)*this.speed);
            this.last=now;
            if (this.time>=this.duration) this.playing=false;
            return this.positions();
        }
        play(now) {this.last=now;this.playing=this.time<this.duration;}
        pause(now) {this.tick(now);this.playing=false;}
        setSpeed(value,now) {
            if (!Number.isFinite(value) || value<0.00001 || value>10) throw new RangeError('倍率范围为 0.00001～10');
            this.tick(now);this.speed=value;
        }
        seek(time,now) {
            this.time=Math.max(0,Math.min(this.duration,time));this.last=now;
            if(this.time>=this.duration)this.playing=false;
            return this.positions();
        }
        positions() {
            return Object.fromEntries(Object.entries(this.tracks).map(([key,track])=>{
                let low=0,high=track.frames.length;
                while(low<high){const mid=(low+high)>>1;if(track.frames[mid].elapsed_ms<=this.time)low=mid+1;else high=mid;}
                return [key,low-1];
            }));
        }
    }
    if (typeof module !== 'undefined' && module.exports) module.exports=ArenaTimelineClock;
    else host.ArenaTimelineClock=ArenaTimelineClock;
})(typeof window !== 'undefined' ? window : globalThis);
