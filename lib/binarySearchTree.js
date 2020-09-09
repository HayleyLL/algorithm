//left & right: left child & right child.
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const node = new Node(value);
    if (this.root == null) {
      this.root = node;
    } else {
      let current = this.root;
      while (true) {
        parent = current;
        if (value < parent.value) {
          current = current.left;
          if (current == null) {
            parent.left = node;
            break;
          }
        } else {
          current = current.right;
          if (current == null) {
            parent.right = node;
            break;
          }
        }
      }
    }
  }

  min() {
    let current = this.root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.value;
  }

  max() {
    let current = this.root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.value;
  }

  search(value) {
    let current = this.root;
    while (current !== null) {
      if (current.value === value) {
        return true;
      } else if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
  }

  remove(value) {
    let node = this.root;

    if (node == null) {
      return null;
    }
    if (node.value === value) {
      //该节点无子节点
      if (node.left == null && node.right == null) {
        return node.value;
      }
    }
  }

  preOrder(current) {
    if (current !== null) {
      console.log(current);
      this.preOrder(current.left);
      this.preOrder(current.right);
    }
  }

  inOrder(current) {
    if (current !== null) {
      this.inOrder(current.left);
      console.log(current);
      this.inOrder(current.right);
    }
  }

  postOrder(current) {
    if (current !== null) {
      this.postOrder(current.left);
      this.postOrder(current.right);
      console.log(current);
    }
  }
}

module.exports = {
  BinarySearchTree,
};
