package com.google.sps.team36;

public final class Message {
  
  private final String receiver;
  private final String sender;
  private final String message;
  private final String timeStamp;


  public Message (String sender, String receiver, String message, String timeStamp) {
    this.sender = sender;
    this.receiver = receiver;
    this.message = message;
    this.timeStamp = timeStamp;
  }

}
