interface PriorityQueueNode<T> {
  priority: number;
  value: T;
}

export class PriorityQueue<T> {
  private heap: Array<PriorityQueueNode<T>>;

  constructor() {
    this.heap = [];
  }

  get length() {
    return this.heap.length;
  }

  private getLeftChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 1;
  }

  private getRightChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 2;
  }

  private getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
  }

  private hasLeftChild(index: number): boolean {
    return this.getLeftChildIndex(index) < this.heap.length;
  }

  private hasRightChild(index: number): boolean {
    return this.getRightChildIndex(index) < this.heap.length;
  }

  private hasParent(index: number): boolean {
    return this.getParentIndex(index) >= 0;
  }

  private leftChild(index: number): PriorityQueueNode<T> | undefined {
    return this.heap[this.getLeftChildIndex(index)];
  }

  private rightChild(index: number): PriorityQueueNode<T> | undefined {
    return this.heap[this.getRightChildIndex(index)];
  }

  private parent(index: number): PriorityQueueNode<T> | undefined {
    return this.heap[this.getParentIndex(index)];
  }

  private swap(indexOne: number, indexTwo: number): void {
    const temp = this.heap[indexOne]!;
    this.heap[indexOne] = this.heap[indexTwo]!;
    this.heap[indexTwo] = temp;
  }

  // Swap a lower priority child with its higher priority parent until no more parent
  private heapifyUp(index: number): void {
    if (!this.hasParent(index)) return;

    if (this.parent(index)!.priority > this.heap[index]!.priority) {
      this.swap(this.getParentIndex(index), index);
      this.heapifyUp(this.getParentIndex(index));
    }
  }

  // Swap higher priority parent with its lowest priority child until no more children
  private heapifyDown(index = 0): void {
    if (!this.hasLeftChild(index)) return;

    let smallerChildIndex = this.getLeftChildIndex(index);
    if (
      this.hasRightChild(index) &&
      this.rightChild(index)!.priority < this.leftChild(index)!.priority
    ) {
      smallerChildIndex = this.getRightChildIndex(index);
    }

    if (this.heap[index]!.priority < this.heap[smallerChildIndex]!.priority) {
      return;
    }

    this.swap(index, smallerChildIndex);
    this.heapifyDown(smallerChildIndex);
  }

  public peek(): T | undefined {
    if (this.heap.length === 0) {
      return undefined;
    }

    return this.heap[0]!.value;
  }

  public add(priority: number, value: T): void {
    this.heap.push({ priority, value });
    this.heapifyUp(this.length - 1);
  }

  public poll(): T | undefined {
    if (this.heap.length === 0) {
      return undefined;
    }

    const minValue = this.heap[0]!;
    this.heap[0] = this.heap.pop() as PriorityQueueNode<T>;
    this.heapifyDown();
    return minValue.value;
  }
}
