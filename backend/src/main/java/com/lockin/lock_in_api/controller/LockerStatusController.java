package com.lockin.lock_in_api.controller;

import com.lockin.lock_in_api.model.LockerSpace;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class LockerStatusController {

    private final SimpMessagingTemplate messagingTemplate;

    public LockerStatusController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void notifyLockerStatusChange(LockerSpace space) {
        messagingTemplate.convertAndSend("/topic/status/" + space.getSpaceID(), space);
    }
}
