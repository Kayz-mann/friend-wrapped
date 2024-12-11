import { useState, useEffect } from 'react';
import * as Contacts from 'expo-contacts';
import { Alert } from 'react-native';

interface UseContactsReturn {
  contacts: Contacts.Contact[];
  permissionStatus: string | null;
  isLoading: boolean;
  error: Error | null;
}

export const useContacts = (
  fields: Contacts.Fields[] = [
    Contacts.Fields.Emails,
    Contacts.Fields.FirstName,
    Contacts.Fields.LastName,
    Contacts.Fields.Image
  ]
): UseContactsReturn => {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [permissionStatus, setPermissionStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        // Reset loading and error states
        setIsLoading(true);
        setError(null);

        // Request permissions
        const { status } = await Contacts.requestPermissionsAsync();
        setPermissionStatus(status);

        // If permission granted, fetch contacts
        if (status === "granted") {
          const { data } = await Contacts.getContactsAsync({ fields });

          if (data.length > 0) {
            // Ensure each contact has a valid id
            const validContacts = data.filter(
              (contact) => contact.id !== undefined
            );

            console.log("Total contacts fetched:", validContacts);
            setContacts(validContacts);
          } else {
            setContacts([]);
          }
        }
      } catch (err) {
        console.error("Error fetching contacts:", err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        Alert.alert("Error", "Could not fetch contacts");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return {
    contacts,
    permissionStatus,
    isLoading,
    error
  };
};