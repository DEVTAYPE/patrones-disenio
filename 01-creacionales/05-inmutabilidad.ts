/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */
class CodeEditorState {
  constructor(
    readonly content: string,
    readonly cursorPosition: number,
    readonly unsaveChanges: boolean,
  ) {}

  cloneWith({
    content,
    cursorPosition,
    unsaveChanges,
  }: Partial<CodeEditorState>): CodeEditorState {
    return new CodeEditorState(
      content ?? this.content,
      cursorPosition ?? this.cursorPosition,
      unsaveChanges ?? this.unsaveChanges,
    );
  }

  displayState() {
    console.log(`Contenido del editor: ${this.content}`);
    console.log(`Cursor pos del editor: ${this.cursorPosition}`);
    console.log(`Unsaved del editor: ${this.unsaveChanges}`);
  }
}

class CodeHistory {
  private history: CodeEditorState[] = [];
  private currentIndex: number = -1;

  save(state: CodeEditorState): void {
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.splice(0, this.currentIndex + 1);
    }

    this.history.push(state);
    this.currentIndex++;
  }

  undo(): CodeEditorState | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    }
    return null;
  }

  redo(): CodeEditorState | null {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }

    return null;
  }
}

function main() {
  const history = new CodeHistory();
  let editorState = new CodeEditorState("console.log()", 2, false);

  history.save(editorState);
  editorState.displayState();

  editorState = editorState.cloneWith({
    content: "console.log('Hello, World!')",
    unsaveChanges: true,
  });
  history.save(editorState);
  editorState.displayState();

  const previousState = history.undo();
  if (previousState) {
    previousState.displayState();
  }

  const nextState = history.redo();
  if (nextState) {
    nextState.displayState();
  }
}

main();
