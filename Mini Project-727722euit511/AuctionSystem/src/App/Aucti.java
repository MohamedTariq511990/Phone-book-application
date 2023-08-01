package App;

import java.sql.*;
import java.util.*;

import Auction.AuctionItems;
import Auction.Auctions;
import Auction.Items;
import Main.Jdbc;



public class Aucti {
    private static Connection connection;
    private static List<Auctions> users = new ArrayList<>();
    private static List<AuctionItems> auctionItems = new ArrayList<>();

    public static void main(String[] args) throws ClassNotFoundException, SQLException {
        connection = Jdbc.getConnection();
        if (connection == null) {
            System.out.println("Failed to connect to the database.");
            return;
        }

        Scanner scanner = new Scanner(System.in);
        boolean isRunning = true;

        while (isRunning) {
            System.out.println("Welcome to the Online Auction System!");
            System.out.println("1. Register as a new user");
            System.out.println("2. List a new item for auction");
            System.out.println("3. Bid on an item");
            System.out.println("4. View all items");
            System.out.println("5. Exit");
            System.out.println("Enter your choice:");

            int choice = scanner.nextInt();
            scanner.nextLine();

            switch (choice) {
                case 1:
                    registerUser(scanner);
                    break;
                case 2:
                    listItemForAuction(scanner);
                    break;
                case 3:
                    placeBid(scanner);
                    break;
                case 4:
                    viewAllItems();
                    break;
                case 5:
                    isRunning = false;
                    System.out.println("Thank you for using the Online Auction System!");
                    break;
                default:
                    System.out.println("Invalid choice. Please try again.");
                    break;
            }
        }

        try {
            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        scanner.close();
    }

    private static void registerUser(Scanner scanner) {
        System.out.println("Enter your username:");
        String username = scanner.nextLine();
        System.out.println("Enter your email:");
        String email = scanner.nextLine();

        try {
            String sql = "INSERT INTO users (username, email) VALUES (?, ?)";
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, username);
            statement.setString(2, email);

            int affectedRows = statement.executeUpdate();
            if (affectedRows == 1) {
                ResultSet generatedKeys = statement.getGeneratedKeys();
                if (generatedKeys.next()) {
                    int userId = generatedKeys.getInt(1);
                    Auctions newUser = new Auctions(userId, username, email);
                    users.add(newUser);
                    System.out.println("Registration successful! Welcome, " + username);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static void listItemForAuction(Scanner scanner) {
        System.out.println("Enter the item name:");
        String itemName = scanner.nextLine();
        System.out.println("Enter the item description:");
        String itemDescription = scanner.nextLine();
        System.out.println("Enter the starting price:");
        double startingPrice = scanner.nextDouble();

        try {
            String sql = "INSERT INTO auction_itemsss (name, description, starting_price, current_highest_bid, highest_bidder_id) " +
                    "VALUES (?, ?, ?, ?, NULL)";
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, itemName);
            statement.setString(2, itemDescription);
            statement.setDouble(3, startingPrice);
            statement.setDouble(4, startingPrice);

            int affectedRows = statement.executeUpdate();
            if (affectedRows == 1) {
                ResultSet generatedKeys = statement.getGeneratedKeys();
                if (generatedKeys.next()) {
                    int itemId = generatedKeys.getInt(1);
                    Items newItem = new Items(itemId, itemName, itemDescription, startingPrice);
                    auctionItems.add(newItem);
                    System.out.println("Item listed successfully with ID: " + itemId);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    private static void placeBid(Scanner scanner) {
        System.out.println("Enter the ID of the item you want to bid on:");
        int itemId = scanner.nextInt();
        System.out.println("Enter your username:");
        scanner.nextLine(); // Clear the newline character
        String username = scanner.nextLine();
        System.out.println("Enter your bid amount:");
        double bidAmount = scanner.nextDouble();
        //object
        AuctionItems item = findAuctionItem(itemId);
        Auctions bidder = findUserByUsername(username);

        if (item == null || bidder == null) {
            System.out.println("Item not found or user not registered.");
            return;
        }

        item.updateHighestBid(bidAmount, bidder.getId());
        try {
            String updateItemSql = "UPDATE auction_itemsss SET current_highest_bid = ?, highest_bidder_id = ? WHERE id = ?";
            PreparedStatement updateItemStatement = connection.prepareStatement(updateItemSql);
            updateItemStatement.setDouble(1, item.getCurrentHighestBid());
            updateItemStatement.setInt(2, item.getHighestBidderId());
            updateItemStatement.setInt(3, item.getId());
            updateItemStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        System.out.println("Bid placed successfully!");
    }


    private static void viewAllItems() {
        for (AuctionItems item : auctionItems) {
            int itemId = item.getId();
            String itemName = item.getName();
            String itemDescription = item.getDescription();
            double currentHighestBid = item.getCurrentHighestBid();
            int highestBidderId = item.getHighestBidderId();

            String highestBidder = "No bids yet";

            if (highestBidderId != 0) {
                Auctions bidder = findUserById(highestBidderId);
                if (bidder != null) {
                    highestBidder = bidder.getUsername();
                }
            }

            System.out.println("Item ID: " + itemId);
            System.out.println("Name: " + itemName);
            System.out.println("Description: " + itemDescription);
            System.out.println("Current Highest Bid: " + currentHighestBid);
            System.out.println("Highest Bidder: " + highestBidder);
            System.out.println("---------------");
        }
    }

    private static Auctions findUserById(int userId) {
        for (Auctions user : users) {
            if (user.getId() == userId) {
                return user;
            }
        }
        return null;
    }

    private static Auctions findUserByUsername(String username) {
        for (Auctions user : users) {
            if (user.getUsername().equalsIgnoreCase(username)) {
                return user;
            }
        }
        return null;
    }

    private static AuctionItems findAuctionItem(int itemId) {
        for (AuctionItems item : auctionItems) {
            if (item.getId() == itemId) {
                return item;
            }
        }
        return null;
    }
}