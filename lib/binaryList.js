//left & right: left child & right child.
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryList {
    constructor() {
        this.root = null;
    }

    preOrder(current) {
        if(current){
            console.log(current);
            this.preOrder(current.left);
            this.preOrder(current.right);
        }
    }

    inOrder(current){
        if(current){
            this.inOrder(current.left);
            console.log(current);
            this.inOrder(current.right)
        }
    }

    postOrder(current){
        if(current){
            this.postOrder(current.left)
            this.postOrder(current.right)
            console.log(current)
        }
    }


}

module.exports={
    BinaryList
}