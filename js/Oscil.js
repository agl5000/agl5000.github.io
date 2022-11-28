class Oscil {
    constructor(audioCtx, freq, gain) { // the constructor() method is always the first method listed in a class; methods are properties of classes (aka Objects) that are functions.
        this.audioCtx = audioCtx;   //
        this.oscillator = this.audioCtx.createOscillator();
        this.vol = this.audioCtx.createGain();
        this.vol.gain.value = gain;
        this.oscillator.type = "sine";
        this.oscillator.frequency.value = freq;
        this.oscillator.connect(this.vol);
        this.vol.connect(this.audioCtx.destination);
    }

    play(attackVal, decayVal, sustainVal) {
        let now = audioCtx.currentTime;

        this.vol.gain.cancelScheduledValues(0);
        this.vol.gain.setValueAtTime(.0001, now);
        this.vol.gain.exponentialRampToValueAtTime(.05, now + attackVal);
        this.vol.gain.exponentialRampToValueAtTime(sustainVal * .025, now + attackVal + decayVal);
        // console.log(sustainVal);
        this.oscillator.start();
        return this;
    }

    stop(sustainVal, releaseVal) {
        let now = audioCtx.currentTime;
        
        this.vol.gain.cancelScheduledValues(0);
        this.vol.gain.exponentialRampToValueAtTime(sustainVal * .025, now);
        this.vol.gain.exponentialRampToValueAtTime(.0001, now + releaseVal);
        this.oscillator.stop(now + releaseVal + .01);
    }
}