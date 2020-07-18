package com.google.sps.team36;

public final class User {
  
  private final String username;
  private final String name;
  private final String organization;
  private final String number;
  private final String email;


  public User(String username, String name, String email, String number, 
      String organization) {
    this.username = username;
    this.name = name;
    this.email = email;
    this.number = number;
    this.organization = organization;
  }

}
