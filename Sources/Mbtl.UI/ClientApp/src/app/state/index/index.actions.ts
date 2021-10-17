import { Link } from "../types/link.type";

export class GetInitialState {
  static readonly type = '[On init] GET initial state';
}

export class CreateCharacter {
  static readonly type = '[Character selection] Create new character';
}

export class SelectCharacter {
  static readonly type = '[Character selection] Select character';
  constructor(public readonly payload: { characterId: number }) {}
}

export class StartEdit {
  static readonly type = '[Character selection] Edit character';
}

export class UndoEdit {
  static readonly type = '[Character selection] Undo edit';
}

export class SaveCharacter {
  static readonly type = '[Character selection] Save character changes';
  constructor(public readonly payload: { link: Link, name: string }) {}
}

export class DeleteCharacter {
  static readonly type = '[Character selection] Delete character';
  constructor(public readonly payload: { link: Link, characterId: number }) {}
}