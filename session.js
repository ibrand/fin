class Session {
    constructor(tree, initial) {
        this.tree = tree
        this.node = initial
        this.isVoting = false
        this.votes = {}
    }
    begin() {
        let options = this.tree[this.node] || []
        console.log(this.node)
        options.forEach(function (option) {
            this.votes[option] = 0
        }, this)
        this.isVoting = true
    }
    end() {
        let votes = this.votes
        let max = null

        Object.keys(votes).forEach(function(option) {
            if (!max || votes[option] > votes[max]) {
                max = option
            }
        })
        
        this.votes = {}
        this.isVoting = false
        this.node = max
    }
}

module.exports = Session