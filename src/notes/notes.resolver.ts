import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotesService } from './notes.service.js';
import { Note } from './models/note.model.js';
import { CreateNoteInput } from './dto/create-note.input.js';
import { UpdateNoteInput } from './dto/update-note.input.js';

@Resolver(() => Note)
export class NotesResolver {
    constructor(
        private readonly notesService: NotesService,
    ) { }

    @Query(() => [Note])
    notes() {
        return this.notesService.findAll();
    }

    @Query(() => Note)
    note(
        @Args('id', { type: () => Int }) id: number,
    ) {
        return this.notesService.findOne(id);
    }

    @Mutation(() => Note)
    createNote(
        @Args('input') input: CreateNoteInput,
    ) {
        return this.notesService.create(input);
    }

    @Mutation(() => Note)
    updateNote(
        @Args('input') input: UpdateNoteInput,
    ) {
        const { id, conceptIds, ...data } = input;

        return this.notesService.update(id, data, conceptIds);
    }

    @Mutation(() => Note)
    deleteNote(
        @Args('id', { type: () => Int }) id: number,
    ) {
        return this.notesService.delete(id);
    }
}