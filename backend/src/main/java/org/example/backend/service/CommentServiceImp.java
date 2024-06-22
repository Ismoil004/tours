package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.CommentDto;
import org.example.backend.entity.Comment;
import org.example.backend.repository.CommentRepo;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentServiceImp implements CommentService {
    final CommentRepo commentRepo;

    @Override
    public Comment post(CommentDto commentDto) {
        Comment comment = new Comment(UUID.randomUUID(), commentDto.firstName(), commentDto.lastName(), commentDto.text(), false, true);
        return commentRepo.save(comment);
    }

    @Override
    public HttpEntity<?> get() {
        return ResponseEntity.ok(commentRepo.findAll());
    }

    public Comment updateStatus(UUID id, boolean status) {
        Comment comment = commentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
        comment.setStatus(status);
        return commentRepo.save(comment);
    }

    @Override
    public List<Comment> getApprovedComments() {
        List<Comment> allComments = commentRepo.findAll();
        return allComments.stream()
                .filter(Comment::getStatus)
                .collect(Collectors.toList());
    }


    public Comment updateAdminStatus(UUID id, boolean adminStatus) {
        Optional<Comment> optionalComment = commentRepo.findById(id);
        if (optionalComment.isPresent()) {
            Comment comment = optionalComment.get();
            comment.setAdminstatus(adminStatus);
            return commentRepo.save(comment);
        } else {
            return null;
        }
    }


    public List<Comment> getAdminStatusTrueComments() {
        return commentRepo.findByAdminstatus(true);
    }
}
