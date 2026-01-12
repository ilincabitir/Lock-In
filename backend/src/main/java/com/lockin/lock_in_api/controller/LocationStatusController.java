package com.lockin.lock_in_api.controller;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class LocationStatusController {

    private final SimpMessagingTemplate messagingTemplate;

    public LocationStatusController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void notifyLocationDeactivation(Integer locationId) {
        messagingTemplate.convertAndSend("/topic/location/" + locationId, "deactivated");
    }

    public void notifySpaceDeactivation(Integer spaceId) {
        messagingTemplate.convertAndSend("/topic/space/" + spaceId, "deactivated");
    }
}
