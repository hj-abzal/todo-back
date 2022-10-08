import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {TodolistsService} from './services/todolists.service';
import {Todolists} from './models/todolists.model';
import {JwtAuthGuard, UserRequestType} from '../auth/jwt-auth.guard';
import {CreateTodolistDto} from './dto/create-todolist.dto';
import {TasksService} from './services/tasks.service';
import {UpdateTask} from './models/tasks.model';
import {CreateTaskDto} from './dto/create-task.dto';

@ApiTags('Todolists')
@Controller('todolists')
export class TodolistsController {
    constructor(
        private todolistService: TodolistsService,
        private tasksService: TasksService
    ) {
    }

    @ApiOperation({summary: 'Create new Todolist'})
    @ApiResponse({status: 200, type: Todolists})
    @UseGuards(JwtAuthGuard)
    @Post()
    createTodolist(@Body() dto: CreateTodolistDto, @Req() req: UserRequestType) {
        return this.todolistService.create({title: dto.title, user_id: req.user.id});
    }

    @ApiOperation({summary: 'Get all Todolist'})
    @ApiResponse({status: 200, type: [Todolists]})
    @UseGuards(JwtAuthGuard)
    @Get()
    getAllTodolist(@Req() req: UserRequestType) {
        return this.todolistService.getAll(req.user.id);
    }

    @ApiOperation({summary: 'Get one todolist by id'})
    @ApiResponse({status: 200, type: Todolists})
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    getTodolistById(@Param('id') id: number) {
        return this.todolistService.getById(id);
    }

    @ApiOperation({summary: 'Delete one todolist by id'})
    @ApiResponse({status: 200})
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    deleteTodolistById(@Param('id') id: number) {
        return this.todolistService.delete(id);
    }

    @ApiOperation({summary: 'Update one todolist by id'})
    @ApiResponse({status: 200})
    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    updateTodolistById(
        @Param('id') id: number,
        @Body() body: CreateTodolistDto
    ) {
        return this.todolistService.update(id, body.title);
    }

    @ApiOperation({summary: 'Get tasks of todolist'})
    @ApiResponse({status: 200, type: Todolists})
    @UseGuards(JwtAuthGuard)
    @Get('/:id/tasks')
    getTodolistTasks(@Param('id') id: number) {
        return this.tasksService.getTasksByTodolistId(id);
    }

    @ApiOperation({summary: 'Create task in todolist'})
    @ApiResponse({status: 200, type: Todolists})
    @UseGuards(JwtAuthGuard)
    @Post('/:id/tasks')
    crateTask(
        @Param('id') id: number,
        @Body() body: CreateTaskDto
    ) {
        const newTask = {title: body.title, todolist_id: id};
        return this.tasksService.create(newTask);
    }

    @ApiOperation({summary: 'update task by todo and task id'})
    @ApiResponse({status: 200, type: Todolists})
    @UseGuards(JwtAuthGuard)
    @Put('/:todolistId/tasks/:taskId')
    updateTodolistTaskById(
        @Param('todolistId') todolistId: number,
        @Param('taskId') taskId: number,
        @Body() body: UpdateTask
    ) {
        return  this.tasksService.updateTask(todolistId, taskId, body);
    }

    @ApiOperation({summary: 'Delete task by todo and task id'})
    @ApiResponse({status: 200, type: Todolists})
    @UseGuards(JwtAuthGuard)
    @Delete('/:todolistId/tasks/:taskId')
    deleteTodolistTaskById(
        @Param('todolistId') todolistId: number,
        @Param('taskId') taskId: number,
    ) {
        return  this.tasksService.delete(taskId);
    }
}
