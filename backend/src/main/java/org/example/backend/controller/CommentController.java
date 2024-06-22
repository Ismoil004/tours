package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.CommentDto;
import org.example.backend.dto.UpdateStatusRequest;
import org.example.backend.entity.Comment;
import org.example.backend.service.CommentService;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comment")
public class CommentController {
    final CommentService commentService;
    @PostMapping
    public HttpEntity<?> post(@RequestBody CommentDto commentDto){
        return ResponseEntity.ok(commentService.post(commentDto));
    }
    @GetMapping("/all")
    public HttpEntity<?> get(){
        return ResponseEntity.ok(commentService.get());
    }

    @PutMapping("/{id}/status")
    public HttpEntity<Comment> updateStatus(@PathVariable UUID id, @RequestBody UpdateStatusRequest request) {
        return ResponseEntity.ok(commentService.updateStatus(id, request.isStatus()));
    }
    @GetMapping("/approved")
    public HttpEntity<List<Comment>> getApprovedComments() {
        List<Comment> approvedComments = commentService.getApprovedComments();
        return ResponseEntity.ok(approvedComments);
    }
    @PutMapping("/{id}/adminstatus")
    public HttpEntity<Comment> updateAdminStatus(@PathVariable UUID id, @RequestBody UpdateStatusRequest request) {
        return ResponseEntity.ok(commentService.updateAdminStatus(id, request.isAdminstatus()));
    }
    @GetMapping("/adminstatus/true")
    public HttpEntity<List<Comment>> getAdminStatusTrueComments() {
        List<Comment> adminStatusTrueComments = commentService.getAdminStatusTrueComments();
        return ResponseEntity.ok(adminStatusTrueComments);
    }
}
