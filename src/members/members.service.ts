import { Injectable, NotFoundException } from '@nestjs/common';
import { Member } from './member.type';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MembersService {
  private members: Member[] = [];
  private nextId = 1;

  create(dto: CreateMemberDto): Member {
    const member: Member = { id: this.nextId++, ...dto };
    this.members.push(member);
    return member;
  }

  findAll(): Member[] {
    return this.members;
  }

  findOne(id: number): Member {
    const member = this.members.find(m => m.id === id);
    if (!member) throw new NotFoundException('Member tidak ditemukan');
    return member;
  }

  update(id: number, dto: UpdateMemberDto): Member {
    const member = this.findOne(id);
    const updated = { ...member, ...dto };
    this.members = this.members.map(m => (m.id === id ? updated : m));
    return updated;
  }

  remove(id: number) {
    this.findOne(id);
    this.members = this.members.filter(m => m.id !== id);
    return { message: `Member dengan id ${id} berhasil dihapus` };
  }
}