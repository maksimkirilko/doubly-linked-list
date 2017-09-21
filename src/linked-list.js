const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    append(data) {
        const node = new Node(data, this._tail, null);
        if (this.length === 0) {
            this._head = node;
            this._tail = node;
        } else {
            this._tail.next = node;
            this._tail = node;
        }
        this.length++;
        return this;
    }

    head() {
        return this._head ? this._head.data : null;
    }

    tail() {
        return this._tail ? this._tail.data : null;
    }

    at(index) {
        if (this.length <= index) {
            throw new Error("The index of the item that you have selected more than the length of the list.");
        } else {
            let node = this._head;
            let i = 0;
            while (i !== index) {
                node = node.next;
                i++;
            }
            return node.data;
        }
    }

    _at(index) {
        if (this.length <= index) {
            return null;
        }
        let node = this._head;
        let i = 0;
        while (i !== index) {
            node = node.next;
            i++;
        }
        return node;
    }

    insertAt(index, data) {
        if (index < this.length) {
            let nodeCur = this._at(index);
            let nodePrev = nodeCur.prev;
            let nodeNext = nodeCur.next;

            const node = new Node(data, nodePrev, nodeCur);

            if (nodePrev) {
                nodePrev.next = node;
            }
            if (nodeNext) {
                nodeNext.prev = node;
            }

            this.length++;
        }
        return this;
    }

    isEmpty() {
        return this.length === 0;
    }

    clear() {
        this.length = 0;
        this._head = null;
        this._tail = null;
        return this;
    }

    deleteAt(index) {
        if (index < this.length) {

            let node = this._head;
            let i = 0;
            while (i < index) {
                node = node.next;
                i++;
            }
            while (i !== this.length - 1) {
                node.data = node.next.data;
                this._tail = node;
                node = node.next;
                i++;
            }
            node.data = null;
            node.next = null;
            this.length--;
            return this;
        } else {
            throw new Error("The index of the item that you have selected more than the length of the list.");
        }
    }

    reverse() {
        const node_buf = {
            data: null,
            next: null,
            prev: null,
        };

        let node_head = this._head;
        let node_tail = this._tail;

        let i = 0;

        while (i < Math.floor(this.length / 2)) {
            node_buf.data = node_tail.data;
            node_tail.data = node_head.data;
            node_head.data = node_buf.data;
            node_head = node_head.next;
            node_tail = node_tail.prev;
            i++;
        }
        return this;
    }

    indexOf(data) {
        let node = this._head;
        let i = 0;
        while (i !== this.length) {
            if (node.data === data) {
                return i;
            }
            node = node.next;
            i++;
        }
        return -1;
    }
}

module.exports = LinkedList;
