function Stopwatch() {
    this.seconds = 0;

    this.start = function (onChange) {
        const self = this;

        self.intervalId = setInterval(function () {
            self.seconds += 1;
            onChange(self.seconds);
        }, 1000);
    };

    this.stop = function () {
        const self = this;

        clearInterval(self.intervalId)
    }

    this.reset = function () {
        const self = this;

        clearInterval(self.intervalId)
        self.seconds = 0;
    }
}
