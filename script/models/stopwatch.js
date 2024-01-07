// Constructor function for creating a Stopwatch object
function Stopwatch() {
    // Initialize the 'seconds' property to 0
    this.seconds = 0;

    // Method to start the stopwatch, with an onChange callback
    this.start = function (onChange) {
        const self = this;

        // Set up an interval to (every second) increment seconds and invoke onChange callback every second
        self.intervalId = setInterval(function () {
            self.seconds += 1;
            onChange(self.seconds);
        }, 1000);
    };

    // Method to stop the stopwatch by clearing the interval
    this.stop = function () {
        const self = this;

        clearInterval(self.intervalId)
    }

    // Method to reset the stopwatch by clearing the interval and setting seconds to 0
    this.reset = function () {
        const self = this;

        clearInterval(self.intervalId)
        self.seconds = 0;
    }
}
