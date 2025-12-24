'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search ,Calendar, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'react-hot-toast';
import {getCampaigns, toggleCampaignStatus, deleteCampaign, GetCampaignsParams} from '@/lib/actions/admin/campaigns';
import { Campaign } from '@/types/campaigns';
import { CampaignFilterData } from '@/schema/campaign';
import { format } from 'date-fns';

export default function CampaignsPage() {
    const router = useRouter();
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState<GetCampaignsParams>({
        page: 1,
        per_page: 10,
        sort: 'starts',
        order: 'desc',
    });
    const [pagination, setPagination] = useState({
        page: 1,
        pages: 1,
        total: 0,
    });

    const fetchCampaigns = async () => {
        setIsLoading(true);
        try {
            const result = await getCampaigns(filters);
            setCampaigns(result.data);
            setPagination(result.pagination);
        } catch (error) {
            toast.error('Error fetching campaigns');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, [filters]);

    const handleStatusToggle = async (id: string) => {
        try {
            await toggleCampaignStatus(id);
            fetchCampaigns();
            toast.success('Status updated successfully');
        } catch (error) {
            toast.error('Error updating campaign status');
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

        try {
            await deleteCampaign(id);
            fetchCampaigns();
            toast.success('Campaign deleted successfully');
        } catch (error) {
            toast.error('Error updating campaign status');
        }
    };

    const handleFilterChange = (key: keyof CampaignFilterData, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
    };

    const formatDate = (dateString: string) => {
        return format(new Date(dateString), 'MMM dd, yyyy');
    };

    const getStatusColor = (campaign: Campaign) => {
        const now = new Date();
        const starts = new Date(campaign.starts_at);
        const ends = new Date(campaign.ends_at);

        if (!campaign.is_active) return 'gray';
        if (now < starts) return 'blue';
        if (now > ends) return 'red';
        return 'green';
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
                    <p className="text-muted-foreground">
                        Manage promotional campaigns and discounts
                    </p>
                </div>
                <Button onClick={() => router.push('/admin/campaign/create')}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Campaign
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <Input
                                placeholder="Search campaigns..."
                                value={filters.keyword || ''}
                                onChange={(e) => handleFilterChange('keyword', e.target.value)}
                                className="max-w-sm"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Select
                                value={filters.is_active?.toString() || undefined}
                                onValueChange={(value) => handleFilterChange('is_active', value === 'true' ? true : value === 'false' ? false : undefined)}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="true">Active</SelectItem>
                                    <SelectItem value="false">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select
                                value={filters.sort || undefined}
                                onValueChange={(value: string) => handleFilterChange('sort', value || undefined)}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="starts">Start Date</SelectItem>
                                    <SelectItem value="ends">End Date</SelectItem>
                                    <SelectItem value="created">Created Date</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button
                                variant={filters.ongoing ? "default" : "outline"}
                                onClick={() => handleFilterChange('ongoing', !filters.ongoing)}
                            >
                                Ongoing
                            </Button>
                            <Button
                                variant={filters.upcoming ? "default" : "outline"}
                                onClick={() => handleFilterChange('upcoming', !filters.upcoming)}
                            >
                                Upcoming
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="text-center py-8">Loading campaigns...</div>
                    ) : campaigns.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">No campaigns found</p>
                        </div>
                    ) : (
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Campaign</TableHead>
                                        <TableHead>Discount</TableHead>
                                        <TableHead>Dates</TableHead>
                                        <TableHead>Products</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {campaigns.map((campaign) => (
                                        <TableRow key={campaign.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    {campaign.banner_image_url && (
                                                        <div className="w-12 h-12 rounded-md overflow-hidden">
                                                            <img
                                                                src={campaign.banner_image_url}
                                                                alt={campaign.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <div className="font-medium">{campaign.name}</div>
                                                        {campaign.badge_text && (
                                                            <Badge variant="outline" className="mt-1">
                                                                {campaign.badge_text}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                    {campaign.discount_percentage}%
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="flex items-center text-sm">
                                                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                                        {formatDate(campaign.starts_at)}
                                                    </div>
                                                    <div className="flex items-center text-sm text-muted-foreground">
                                                        to {formatDate(campaign.ends_at)}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm">
                                                    {campaign.products_count || 0} products
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">

                                                    <Badge variant={getStatusColor(campaign) as any}>
                                                        {getStatusColor(campaign) === 'green' ? 'Active' :
                                                            getStatusColor(campaign) === 'blue' ? 'Upcoming' :
                                                                getStatusColor(campaign) === 'red' ? 'Expired' : 'Inactive'}
                                                    </Badge>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end items-center gap-2">
                                                    <Switch
                                                        checked={campaign.is_active}
                                                        onCheckedChange={() => handleStatusToggle(campaign.id)}
                                                    />
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => router.push(`/admin/campaigns/${campaign.id}/edit`)}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDelete(campaign.id, campaign.name)}
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}

                    {pagination.pages > 1 && (
                        <div className="mt-6">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => handleFilterChange('page', Math.max(1, pagination.page - 1))}
                                            className={pagination.page === 1 ? 'pointer-events-none opacity-50' : ''}
                                        />
                                    </PaginationItem>
                                    {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                                        const page = i + 1;
                                        return (
                                            <PaginationItem key={page}>
                                                <PaginationLink
                                                    isActive={page === pagination.page}
                                                    onClick={() => handleFilterChange('page', page)}
                                                >
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        );
                                    })}
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => handleFilterChange('page', Math.min(pagination.pages, pagination.page + 1))}
                                            className={pagination.page === pagination.pages ? 'pointer-events-none opacity-50' : ''}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}