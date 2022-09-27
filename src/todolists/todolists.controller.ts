import {Body, Controller, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {TodolistsService} from './todolists.service';
import {Todolists} from './todolists.model';
import {JwtAuthGuard, UserRequestType} from '../auth/jwt-auth.guard';
import {CreateTodolistDto} from './dto/create-todolist.dto';
import {TasksService} from '../tasks/tasks.service';
import {UpdateTask} from '../tasks/tasks.model';
import {CreateTaskDto} from '../tasks/dto/create-task.dto';

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
    getAllTodolist() {
        return this.todolistService.getAll();
    }

    @ApiOperation({summary: 'Get one todolist by id'})
    @ApiResponse({status: 200, type: Todolists})
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    getTodolistById(@Param('id') id: number) {
        return this.todolistService.getById(id);
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
    getTodolistTaskById(
        @Param('todolistId') todolistId: number,
        @Param('taskId') taskId: number,
        @Body() body: UpdateTask
    ) {
        return  this.tasksService.updateTask(todolistId, taskId, body);
    }
}
