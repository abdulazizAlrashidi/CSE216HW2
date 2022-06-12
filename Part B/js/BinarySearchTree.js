class Node {
    constructor(initKey, initData, initParent, initLeft, initRight) {
        this.key = initKey;
        this.data = initData;
        this.parent = initParent;
        this.left = initLeft;
        this.right = initRight;
    }
};

export default class BinarySearchTree {
    constructor(initKeyLength) {
        this.root = null;
        this.size = 0;
        this.keyLength = initKeyLength;
    }

    // @todo - YOU MUST UPDATE THIS METHOD SO A KEY ONLY HAS LOWERCASE LETTERS, NO NUMBERS
    generateKey() {
        let key = "";
        for (let i = 0; i < this.keyLength; i++) {
            let randomNum = Math.floor(Math.random() * 36);
            let randomChar;
            if (randomNum < 10) {
                randomNum += 48;
                randomChar = String.fromCharCode(randomNum);
            }
            else {
                randomNum += 55;
                randomChar = String.fromCharCode(randomNum);
            }
            key += randomChar;
        }
        return key;
    }

    // helper method
    search(key) {
        let node = this.root;

        while (node != null && key != node.key) {
            if (key < node.key) {
                node = node.left;
            } else {
                node = node.right;
            }
        }
        return node;
    }

    transplant(u, v) {
        if (u.parent == null) {
            this.root = v;
        } else if (u == u.parent.left) {
            u.parent.left = v;
        } else {
            u.parent.right = v;
        }
        if (v != null) {
            v.parent = u.parent;
        }
    }

    minimum(node) {
        while (node.left != null) {
            node = node.left;
        }
        return node;
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    putValue(key, value) {
        let startingNode = this.root;
        let trailingNode = null;
        let newNode = new Node(key, value);

        while (startingNode != null) {
            trailingNode = startingNode;

            if (newNode.key < startingNode.key) {
                startingNode = startingNode.left;
            } else if (newNode.key > startingNode.key) {
                startingNode = startingNode.right;
            } else {
                break;
            }
        }
        newNode.parent = trailingNode;

        if (trailingNode == null) {
            this.root = newNode;
        } else if (newNode.key < trailingNode.key) {
            trailingNode.left = newNode;
        } else if (newNode.key > trailingNode.key) {
            trailingNode.right = newNode;
        } else {
            trailingNode.data = newNode.data;
        }
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    getValue(key) {
        let node = this.search(key);

        if (node != null) {
            return node.data;
        }
        return null;
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    removeValue(key) {
        let node = this.search(key);

        if (node != null) {
            let tempNode = null;
            if (node.left == null) {
                this.transplant(node, node.right);
            } else if (node.right == null) {
                this.transplant(node, node.left);
            } else {
                tempNode = this.minimum(node.right);
                if (tempNode.parent != null) {
                    this.transplant(tempNode, tempNode.right);
                    tempNode.right = node.right;
                    tempNode.right.parent = tempNode;
                }
                this.transplant(node, tempNode);
                tempNode.left = node.left;
                tempNode.left.parent = tempNode;
            }
        } else {
            return;
        }
    }

    toStringRecursively(traveller, level) {
        let text = "";
        if (traveller.left != null)
            text += this.toStringRecursively(traveller.left, level+1);
        for (let i = 0; i < level; i++) {
            text += "   ";
        }
        text += "   " + traveller.data.toString() + "\n";
        if (traveller.right != null)
            text += this.toStringRecursively(traveller.right, level+1);
        return text;        
    }

    toString() {
        return this.toStringRecursively(this.root, 0);
    }
}