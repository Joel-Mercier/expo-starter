import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { themeConfig } from "@/config/theme";
import { Check } from "lucide-react-native";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";

export default function PostItem({ post }: { post: { title: string; is_active: boolean } }) {
  return (
    <Card size="lg" variant="filled" className="mb-3">
      <HStack className="items-center">
        {post.is_active ? (
          <Box className="w-6 h-6 rounded-full bg-emerald-200 me-2 items-center justify-center">
            <Check size={16} color={themeConfig.theme.colors.emerald[500]} />
          </Box>
        ) : (
          <Box className="w-6 h-6 rounded-full me-2 items-center justify-center">
          
          </Box>
        )}
        <Heading size="md" className="mb-1">{post.title}</Heading>
        
      </HStack>
    </Card>
  );
}